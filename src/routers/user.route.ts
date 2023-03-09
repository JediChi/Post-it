import express from "express";
import userController from "../controllers/user.controller";
import auth from "../middlewares/authenticator.middlewares";
import validator from "../middlewares/validator.middleware";
import { CreateUserSchema, LoginSchema, UpdateUserSchema } from "../schemas/user.schema";

const userRouter = express.Router();

userRouter.post("/",[validator(CreateUserSchema)], userController.create);

userRouter.post("/login",[validator(LoginSchema)], userController.login);

userRouter.get("/me", auth, userController.me);

userRouter.get("/allUsers", auth, userController.getAll);

userRouter.patch("/UpdateMe", [validator(UpdateUserSchema)], auth,  userController.update);

userRouter.delete("/me", auth, userController.delete);

export default userRouter