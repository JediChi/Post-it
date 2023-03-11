import express from "express";
import commentController from "../controllers/comment.controller";
import auth from "../middlewares/authenticator.middlewares";
import validator from "../middlewares/validator.middleware";
import { CreateComment} from "../schemas/comment.schema";
import postRouter from "./post.route";

const commentRouter = express.Router();

commentRouter.post("/", auth, validator(CreateComment), commentController.create);

commentRouter.get("/", auth, commentController.getAll)

export default commentRouter