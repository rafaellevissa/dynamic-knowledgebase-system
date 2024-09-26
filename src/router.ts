import { Router } from "express";
import TopicController from "./topic/topic.controller";
import { asyncHandler, auth } from "./common/middlewares";
import ResourceController from "./resource/resource.controller";
import UserController from "./user/user.controller";

const route = Router();


route.post("/login", asyncHandler(UserController.login));
route.post("/register", asyncHandler(UserController.register));

route.get("/topic", auth, asyncHandler(TopicController.all));
route.get("/topic/:id", auth, asyncHandler(TopicController.find));
route.post("/topic", auth, asyncHandler(TopicController.create));
route.put("/topic/:id", auth, asyncHandler(TopicController.update));
route.delete("/topic/:id", auth, asyncHandler(TopicController.delete));


route.get("/resource", auth, asyncHandler(ResourceController.all));
route.get("/resource/:id", auth, asyncHandler(ResourceController.find));
route.post("/resource", auth, asyncHandler(ResourceController.create));
route.put("/resource/:id", auth, asyncHandler(ResourceController.update));
route.delete("/resource/:id", auth, asyncHandler(ResourceController.delete));

export default route;
