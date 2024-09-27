import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";

/**
 * @swagger
 * components:
 *   schemas:
 *     TopicEntity:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         version:
 *           type: integer
 *         parentTopicId:
 *           type: integer
 *           nullable: true
 *         parentTopic:
 *           $ref: '#/components/schemas/TopicEntity'
 */
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

  @ManyToOne(() => TopicEntity, { nullable: true, onDelete: "CASCADE" })
  public parentTopic?: TopicEntity;
}
