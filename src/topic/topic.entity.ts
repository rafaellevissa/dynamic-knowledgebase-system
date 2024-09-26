import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity()
@Index("unique_name_version", ["name", "version"], { unique: true })
export default class TopicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public content: string;

  @CreateDateColumn()
  public createdAt?: Date;


  @UpdateDateColumn()
  public updatedAt?: Date;


  @Column({ default: 1 })
  public version?: number;


  @Column({ nullable: true })
  public parentTopicId: number;

  @ManyToOne(() => TopicEntity, { nullable: true })
  public parentTopic?: TopicEntity;
}
