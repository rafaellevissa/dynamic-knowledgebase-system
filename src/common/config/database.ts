import { DataSource } from "typeorm";
import TopicEntity from "../../topic/topic.entity";
import ResourceEntity from "../../resource/resource.entity";
import UserEntity from "../../user/user.entity";

export default new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [TopicEntity, ResourceEntity, UserEntity],
  synchronize: true,
});
