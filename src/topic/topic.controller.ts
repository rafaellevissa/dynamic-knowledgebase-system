import { Request, Response } from "express";
import TopicService from "./topic.service";
import { TopicDto } from "./topic.dto";
import { validateSync } from "class-validator";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";

export default class TopicController {
  public static async all(_: Request, res: Response) {
    const topicService = new TopicService();
    const topics = await topicService.getTopics();

    return res.status(200).json(topics);
  }

  public static async find(req: Request, res: Response) {
    const { id } = req.params;
    const topicId = parseInt(id);

    const topicService = new TopicService();
    const topic = await topicService.findById(topicId);

    if (!topic) {
      throw new HttpException(HTTPStatusCode.NOT_FOUND, "Topic not found")
    }

    return res.status(200).json(topic);
  }

  public static async create(req: Request, res: Response) {
    const payload = new TopicDto(req.body)
    const topicService = new TopicService();

    const errors = validateSync(payload);

    if (errors.length > 0) {
      throw new HttpException(HTTPStatusCode.BAD_REQUEST, errors.join(", "));
    }

    const topic = await topicService.create(req.body);

    return res.status(201).json(topic);
  }

  public static async update(req: Request, res: Response) {
    const payload = new TopicDto(req.body)
    const { id } = req.params;
    const topicId = parseInt(id);

    const topicService = new TopicService();


    const errors = validateSync(payload);

    if (errors.length > 0) {
      throw new HttpException(HTTPStatusCode.BAD_REQUEST, errors.join(", "));
    }

    const topic = await topicService.update(topicId, req.body);

    return res.status(200).json(topic);
  }


  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const topicId = parseInt(id);

    const topicService = new TopicService();

    const topic = await topicService.delete(topicId);

    return res.status(200).json(topic);
  }
}
