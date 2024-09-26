import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ResourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public role: string

  public createdAt: Date
}

