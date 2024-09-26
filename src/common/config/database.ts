import { DataSource } from "typeorm";
import TopicEntity from "../../topic/topic.entity";
import ResourceEntity from "../../resource/resource.entity";

export default new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [TopicEntity, ResourceEntity],
  synchronize: true,
});
