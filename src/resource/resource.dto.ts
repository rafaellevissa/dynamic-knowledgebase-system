import {
  IsNotEmpty,
  IsPositive,
  IsString,
} from "class-validator";

export class ResourceDto {
  @IsPositive()
  public topicId: number

  @IsString()
  @IsNotEmpty()
  public url: string

  @IsString()
  @IsNotEmpty()
  public description: string

  @IsString()
  @IsNotEmpty()
  public type: string


  constructor(payload: any) {
    this.topicId = payload?.topicId;
    this.url = payload?.url;
    this.description = payload?.description;
    this.type = payload?.type;
  }
}
