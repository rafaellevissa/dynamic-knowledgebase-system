import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { application } from "../common/config/constants";
import { UserRole } from "../common/data-types";

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public role: UserRole;

  @CreateDateColumn()
  public createdAt: Date;

  public async generateToken(): Promise<string> {
    const payload = { id: this.id, email: this.email };
    return sign(payload, application.secret, { expiresIn: '1h' });
  }

  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

