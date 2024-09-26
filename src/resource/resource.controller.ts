import { Request, Response } from "express";
import { validateSync } from "class-validator";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";
import ResourceService from "./resource.service";
import { ResourceDto } from "./resource.dto";

export default class ResourceController {
  public static async all(_: Request, res: Response) {
    const resourceService = new ResourceService();
    const resource = await resourceService.getResources();

    return res.status(200).json(resource);
  }

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


  public static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const resourceId = parseInt(id);

    const resourceService = new ResourceService();

    const resource = await resourceService.delete(resourceId);

    return res.status(200).json(resource);
  }
}
