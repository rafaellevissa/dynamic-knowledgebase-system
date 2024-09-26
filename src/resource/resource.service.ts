import { Repository } from "typeorm";
import database from "../common/config/database";
import { HttpException } from "../common/exceptions";
import { HTTPStatusCode } from "../common/data-types";
import ResourceEntity from "./resource.entity";

export default class ResourceService {
  private resourceRepository: Repository<ResourceEntity>;

  constructor() {
    this.resourceRepository = database.manager.getRepository(ResourceEntity);
  }

  public async getResources(): Promise<ResourceEntity[]> {
    return this.resourceRepository.find();
  }

  public async getResourceById(id: number): Promise<ResourceEntity | null> {
    return this.resourceRepository.findOneBy({ id });
  }

  public async create(payload: Partial<ResourceEntity>) {
    const resource = this.resourceRepository.create(payload);
    return resource.save();
  }

  public async update(id: number, payload: Partial<ResourceEntity>) {
    const resource = await this.getResourceById(id);
    if (!resource) throw new HttpException(HTTPStatusCode.NOT_FOUND, "Resource not found");

    return this.create(payload);
  }

  public async delete(id: number) {
    const resource = await this.getResourceById(id);
    if (!resource) throw new HttpException(HTTPStatusCode.NOT_FOUND, "Resource not found");

    return this.resourceRepository.delete({ id: resource.id });
  }
}
