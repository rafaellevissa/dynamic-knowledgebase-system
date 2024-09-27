import { Repository } from "typeorm";
import TopicService from "./topic.service";
import TopicEntity from "./topic.entity";
import { HttpException } from "../common/exceptions";

describe("TopicService", () => {
    let topicService: TopicService;
    let topicRepository: Repository<TopicEntity>;

    beforeEach(() => {
        topicRepository = {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn()
        } as unknown as Repository<TopicEntity>;
        topicService = new TopicService();
        (topicService as any).topicRepository = topicRepository;
    });

    it("should retrieve all topics", async () => {
        const topics = [{ id: 1, name: "Test Topic" }];
        topicRepository.find = jest.fn().mockResolvedValue(topics);

        const result = await topicService.getTopics();
        expect(result).toEqual(topics);
    });

    it("should find a topic by ID", async () => {
        const topic = { id: 1, name: "Test Topic" };
        topicRepository.findOneBy = jest.fn().mockResolvedValue(topic);

        const result = await topicService.findById(1);
        expect(result).toEqual(topic);
    });

    it("should create a new topic", async () => {
        const payload = { name: "New Topic", content: "Content" };
        const save = jest.fn().mockResolvedValue(payload);
        const topicEntity = {
            ...payload,
            save,
        };
        topicRepository.create = jest.fn().mockReturnValue(topicEntity);
        topicRepository.save = jest.fn().mockResolvedValue(payload);

        const result = await topicService.create(payload);
        expect(result).toEqual(payload);
    });

    it("should update a topic", async () => {
        const existingTopic = { id: 1, name: "Test Topic", version: 1 };
        const updatedPayload = { name: "Updated Topic" };
        const save = jest.fn().mockResolvedValue({
            ...existingTopic, ...updatedPayload, version: 2,
        })
        const topicEntity = {
            ...existingTopic, ...updatedPayload, version: 2,
            save,
        }
        topicRepository.findOneBy = jest.fn().mockResolvedValue(existingTopic);
        topicRepository.create = jest.fn().mockReturnValue(topicEntity);
        topicRepository.save = jest.fn().mockResolvedValue({ ...existingTopic, ...updatedPayload, version: 2 });

        const result = await topicService.update(1, updatedPayload);
        expect(result).toEqual({ ...existingTopic, ...updatedPayload, version: 2 });
    });

    it("should throw an error if topic to update is not found", async () => {
        topicRepository.findOneBy = jest.fn().mockResolvedValue(null);

        await expect(topicService.update(1, {})).rejects.toThrow(HttpException);
    });

    it("should delete a topic", async () => {
        const topic = { id: 1, name: "Test Topic" };
        topicRepository.findOneBy = jest.fn().mockResolvedValue(topic);
        topicRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });

        await topicService.delete(1);
        expect(topicRepository.delete).toHaveBeenCalledWith({ id: topic.id });
    });

    it("should throw an error if topic to delete is not found", async () => {
        topicRepository.findOneBy = jest.fn().mockResolvedValue(null);

        await expect(topicService.delete(1)).rejects.toThrow(HttpException);
    });
});
