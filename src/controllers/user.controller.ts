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

  async me(req: Request, res: Response) {

    return res.status(200).send({
      success: true,
      message: "User listed successfully",
      data: req.user
    });
  }

  async getAll(req: Request, res:Response) {
    const users = await userService.getAllUsers();

    return res.status(201).send({
      success: true,
      message: "Users listed successfully",
      data: users,
    });
  }

  async update(req: Request, res: Response) {
    const updatedUser = await userService.updateMe(req.user, req.body);

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }
}

export default new UserController();
