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
}

export default new UserController();
