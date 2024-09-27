import { Router } from "express";
import TopicController from "./topic/topic.controller";
import { asyncHandler, auth } from "./common/middlewares";
import ResourceController from "./resource/resource.controller";
import UserController from "./user/user.controller";

const route = Router();


route.post("/login", asyncHandler(UserController.login));
route.post("/register", asyncHandler(UserController.register));

route.get("/topics/", auth, asyncHandler(TopicController.all));
route.get("/topics/:id", auth, asyncHandler(TopicController.find));
route.post("/topics/", auth, asyncHandler(TopicController.create));
route.put("/topics/:id", auth, asyncHandler(TopicController.update));
route.delete("/topics/:id", auth, asyncHandler(TopicController.delete));
route.get("/topics/:id/subtopics", auth, asyncHandler(TopicController.findWithSubtopics));

route.get("/resources", auth, asyncHandler(ResourceController.all));
route.get("/resources/:id", auth, asyncHandler(ResourceController.find));
route.post("/resources/", auth, asyncHandler(ResourceController.create));
route.put("/resources/:id", auth, asyncHandler(ResourceController.update));
route.delete("/resources/:id", auth, asyncHandler(ResourceController.delete));

export default route;
