import express from "express";
import auth from "../middlewares/authenticator.middlewares";
import additionalRouterController from "../controllers/additionalControllers.controller";


const additionalRouter = express.Router();

const addUserRouter = '/:userId/posts'

additionalRouter.get(`${addUserRouter}`, auth, additionalRouterController.getAll)

additionalRouter.get(`${addUserRouter}/:postId`, auth, additionalRouterController.getAllPostsById)

additionalRouter.get(`${addUserRouter}/:postId/comments`, auth, additionalRouterController.getAllCommentsByPostId)

additionalRouter.get(`${addUserRouter}/:postId/comments/:id`, auth, additionalRouterController.getACommentById)


export default additionalRouter