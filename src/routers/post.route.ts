import express from "express";
import postitController from "../controllers/postit.controller";
import auth from "../middlewares/authenticator.middlewares";
import validator from "../middlewares/validator.middleware";
import { upload } from "../middlewares/media.middleware";
import { CreatePost } from "../schemas/postit.schema";

const postRouter = express.Router();

postRouter.post("/", auth, upload.single("file"), validator(CreatePost), postitController.create.bind(postitController));

export default postRouter;