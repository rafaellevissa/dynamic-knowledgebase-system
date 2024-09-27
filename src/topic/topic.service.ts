import { Repository } from "typeorm";
import database from "../common/config/database";
import TopicEntity from "./topic.entity";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";

export default class TopicService {
  private topicRepository: Repository<TopicEntity>;

  constructor() {
    this.topicRepository = database.manager.getRepository(TopicEntity);
  }

  public async getTopics(): Promise<TopicEntity[]> {
    return this.topicRepository.find();
  }

  public async findById(id: number): Promise<TopicEntity | null> {
    return this.topicRepository.findOneBy({ id });
  }

  public async create(payload: Partial<TopicEntity>) {
    await this.validateUniqueName(payload.name);
    await this.validateParentExists(payload.parentTopicId);

    const topic = this.topicRepository.create(payload);
    return topic.save();
  }

  public async update(id: number, payload: Partial<TopicEntity>) {
    const topic = await this.findById(id);
    if (!topic) throw new HttpException(HTTPStatusCode.NOT_FOUND, "Topic not found");

    const latestVersion = await this.getLatestTopicVersion(topic.name);
    if (topic.version !== latestVersion) {
      throw new HttpException(HTTPStatusCode.BAD_REQUEST, "You can only update the latest topic version");
    }

    const updatedTopic = await this.create({
      ...payload,
      version: latestVersion,
    });

    return updatedTopic;
  }

  public async delete(id: number) {
    const topic = await this.findById(id);
    if (!topic) throw new HttpException(HTTPStatusCode.NOT_FOUND, "Topic not found");

    return this.topicRepository.delete({ id: topic.id });
  }

  public async findByName(name: string): Promise<TopicEntity | null> {
    return this.topicRepository.findOne({
      where: { name },
      order: { version: "DESC" },
    });
  }

  private async getLatestTopicVersion(name: string): Promise<number> {
    const existingTopic = await this.findByName(name);
    return existingTopic ? (existingTopic.version ?? 0) + 1 : 1;
  }

  private async validateUniqueName(name?: string) {
    if (!name) return;
    const existingTopic = await this.findByName(name);
    if (existingTopic) {
      throw new HttpException(HTTPStatusCode.CONFLICT, "A topic with the same name already exists");
    }
  }

  private async validateParentExists(parentTopicId?: number) {
    if (parentTopicId) {
      const parentTopic = await this.findById(parentTopicId);
      if (!parentTopic) {
        throw new HttpException(HTTPStatusCode.NOT_FOUND, "Parent topic not found");
      }
    }
  }

  public async findWithSubtopics(id: number): Promise<any> {
    const topic = await this.findById(id);
    if (!topic) return null;

    const subtopics = await this.topicRepository.find({
      where: { parentTopicId: id },
    });

    return {
      ...topic,
      subtopics: await Promise.all(subtopics.map(subtopic => this.findWithSubtopics(subtopic.id))),
    };
  }
}
