import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  async create(req: Request, res: Response) {
    const newUser = await userService.createUser(req.body);

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  }

  async login(req: Request, res: Response) {
    const loginUser = await userService.loginUser(
      req.body.email,
      req.body.password
    );
    if (!loginUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.header("x-auth-header-token",loginUser.token).status(200).send({
      success: true,
      message: "User logged in successfully",
      data: loginUser,
    });
  }
}

export default new UserController();
