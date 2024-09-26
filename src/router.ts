import { Router } from "express";
import TopicController from "./topic/topic.controller";
import { asyncHandler } from "./common/middlewares";
import ResourceController from "./resource/resource.controller";

const route = Router();

route.get("/topic", asyncHandler(TopicController.all));
route.get("/topic/:id", asyncHandler(TopicController.find));
route.post("/topic", asyncHandler(TopicController.create));
route.put("/topic/:id", asyncHandler(TopicController.update));
route.delete("/topic/:id", asyncHandler(TopicController.delete));


route.get("/resource", asyncHandler(ResourceController.all));
route.get("/resource/:id", asyncHandler(ResourceController.find));
route.post("/resource", asyncHandler(ResourceController.create));
route.put("/resource/:id", asyncHandler(ResourceController.update));
route.delete("/resource/:id", asyncHandler(ResourceController.delete));

export default route;
