import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import userService from "../services/user.service";

class UserController {
  async create(req: Request, res: Response) {

    const existingUser = await userService.findOne(req.body.email)

    if (existingUser) {
      return res.status(400).send({ 
        success:false,
        error: "User already exists" });
    }
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


  async logoutAll(req: Request, res: Response) {
    req.user.tokens = []

    await req.user.save();

    return res.status(200).send({
      success: true,
      message: "User logged out from all devices successfully",
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

  async delete(req: Request, res: Response) {
    await userService.delete({_id: req.user._id});

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  }
}

export default new UserController();
