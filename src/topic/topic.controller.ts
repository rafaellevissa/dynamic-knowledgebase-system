import { Request, Response } from "express";
import TopicService from "./topic.service";
import { TopicDto } from "./topic.dto";
import { validateSync } from "class-validator";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";

/**
 * @swagger
 * components:
 *   schemas:
 *     TopicDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         content:
 *           type: string
 *         parentTopicId:
 *           type: integer
 *           nullable: true
 */
export default class TopicController {

  /**
   * @swagger
   * /topics:
   *   get:
   *     summary: Retrieve all topics
   *     responses:
   *       200:
   *         description: A list of topics
   */
  public static async all(_: Request, res: Response) {
    const topicService = new TopicService();
    const topics = await topicService.getTopics();

    return res.status(200).json(topics);
  }

  /**
   * @swagger
   * /topics/{id}:
   *   get:
   *     summary: Retrieve a topic by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the topic
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A topic object
   *       404:
   *         description: Topic not found
   */
  public static async find(req: Request, res: Response) {
    const { id } = req.params;
    const topicId = parseInt(id);

    const topicService = new TopicService();
    const topic = await topicService.findById(topicId);

    if (!topic) {
      throw new HttpException(HTTPStatusCode.NOT_FOUND, "Topic not found");
    }

    return res.status(200).json(topic);
  }

  /**
   * @swagger
   * /topics:
   *   post:
   *     summary: Create a new topic
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TopicDto'
   *     responses:
   *       201:
   *         description: Topic created successfully
   *       400:
   *         description: Validation error
   */
  public static async create(req: Request, res: Response) {
    const payload = new TopicDto(req.body);
    const topicService = new TopicService();

    const errors = validateSync(payload);

    if (errors.length > 0) {
      throw new HttpException(HTTPStatusCode.BAD_REQUEST, errors.join(", "));
    }

    const topic = await topicService.create(req.body);

    return res.status(201).json(topic);
  }

  /**
   * @swagger
   * /topics/{id}:
   *   put:
   *     summary: Update a topic by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the topic
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/TopicDto'
   *     responses:
   *       200:
   *         description: Topic updated successfully
   *       400:
   *         description: Validation error
   *       404:
   *         description: Topic not found
   */
  public static async update(req: Request, res: Response) {
    const payload = new TopicDto(req.body);
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

  /**
   * @swagger
   * /topics/{id}:
   *   delete:
   *     summary: Delete a topic by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the topic
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Topic deleted successfully
   *       404:
   *         description: Topic not found
   */
  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const topicId = parseInt(id);

    const topicService = new TopicService();

    await topicService.delete(topicId);

    return res.status(200).json({ message: "Topic deleted successfully" });
  }
}
