import express from "express";
import commentController from "../controllers/comment.controller";
import auth from "../middlewares/authenticator.middlewares";
import validator from "../middlewares/validator.middleware";
import { CreateComment, UpdateComment} from "../schemas/comment.schema";
// import postRouter from "./post.route";

const commentRouter = express.Router();

const postComments = '/:postId/comments'

commentRouter.post(`${postComments}`, auth, validator(CreateComment), commentController.create);

commentRouter.get(`${postComments}`, auth, commentController.getAll)

commentRouter.get(`${postComments}/:id`, auth, commentController.getOne)

commentRouter.patch(`${postComments}/:id`, auth, validator(UpdateComment), commentController.update)

commentRouter.delete(`${postComments}/:id`, auth, commentController.delete);

export default commentRouter