import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class TopicDto {
  @IsString()
  @IsNotEmpty()
  public name: string

  @IsString()
  @IsNotEmpty()
  public content: string


  @IsOptional()
  @IsPositive()
  public parentTopicId: number

  constructor(payload: any) {
    this.name = payload?.name;
    this.content = payload?.content;
    this.parentTopicId = payload?.parentTopicId;
  }
}
