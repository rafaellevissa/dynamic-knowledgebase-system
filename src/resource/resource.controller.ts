import { Request, Response } from "express";
import { validateSync } from "class-validator";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";
import ResourceService from "./resource.service";
import { ResourceDto } from "./resource.dto";

export default class ResourceController {
  /**
   * @swagger
   * /resources:
   *   get:
   *     summary: Retrieve all resources
   *     responses:
   *       200:
   *         description: A list of resources
   */
  public static async all(_: Request, res: Response) {
    const resourceService = new ResourceService();
    const resource = await resourceService.getResources();

    return res.status(200).json(resource);
  }

  /**
   * @swagger
   * /resources/{id}:
   *   get:
   *     summary: Retrieve a resource by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the resource
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: A resource object
   *       404:
   *         description: Resource not found
   */
  public static async find(req: Request, res: Response) {
    const { id } = req.params;
    const resourceId = parseInt(id);

    const resourceService = new ResourceService();
    const resource = await resourceService.getResourceById(resourceId);

    if (!resource) {
      throw new HttpException(HTTPStatusCode.NOT_FOUND, "Resource not found")
    }

    return res.status(200).json(resource);
  }

  /**
   * @swagger
   * /resources:
   *   post:
   *     summary: Create a new resource
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ResourceDto'
   *     responses:
   *       201:
   *         description: Resource created successfully
   *       400:
   *         description: Validation error
   */
  public static async create(req: Request, res: Response) {
    const payload = new ResourceDto(req.body)
    const resourceService = new ResourceService();

    const errors = validateSync(payload);

    if (errors.length > 0) {
      throw new HttpException(HTTPStatusCode.BAD_REQUEST, errors.join(", "));
    }

    const resource = await resourceService.create(req.body);

    return res.status(201).json(resource);
  }

  /**
   * @swagger
   * /resources/{id}:
   *   put:
   *     summary: Update a resource by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the resource
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ResourceDto'
   *     responses:
   *       200:
   *         description: Resource updated successfully
   *       400:
   *         description: Validation error
   *       404:
   *         description: Resource not found
   */
  public static async update(req: Request, res: Response) {
    const payload = new ResourceDto(req.body)
    const { id } = req.params;
    const resourceId = parseInt(id);

    const resourceService = new ResourceService();

    const errors = validateSync(payload);

    if (errors.length > 0) {
      throw new HttpException(HTTPStatusCode.BAD_REQUEST, errors.join(", "));
    }

    const resource = await resourceService.update(resourceId, req.body);

    return res.status(200).json(resource);
  }

  /**
   * @swagger
   * /resources/{id}:
   *   delete:
   *     summary: Delete a resource by ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: The ID of the resource
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Resource deleted successfully
   *       404:
   *         description: Resource not found
   */
  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const resourceId = parseInt(id);

    const resourceService = new ResourceService();

    const resource = await resourceService.delete(resourceId);

    return res.status(200).json(resource);
  }
}
