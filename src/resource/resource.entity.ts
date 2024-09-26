import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import TopicEntity from "../topic/topic.entity";

@Entity()
export default class ResourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => TopicEntity)
  public topic?: TopicEntity;

  @Column()
  public topicId: number

  @Column()
  public url: string

  @Column()
  public description: string

  @Column()
  public type: string

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;
}
