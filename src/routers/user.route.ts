import express from "express";
import userController from "../controllers/user.controller";
import validator from "../middlewares/validator.middleware";
import { CreateUserSchema } from "../schemas/user.schema";

const userRouter = express.Router();

userRouter.post("/",[validator(CreateUserSchema)], userController.create);

export default userRouter