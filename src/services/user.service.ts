import { ICreateUser, IUpdateUser } from "../interfaces/user.interface";
import { Model } from "mongoose";
import User from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

class UserService {
  async createUser(data: ICreateUser) {
    const user = await User.create(data);

    const token = await user.generateAuthToken();

    return { ...user.toJSON(), token };
  }

  async loginUser(email: string, password: string) {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return { user, token };
  }

  async getAllUsers() {
    const users = await User.find({ isDeleted: false });

    return users.map((user) => user.toJSON());
  }

  async updateMe(_user: Partial<IUser>, update: Partial<IUpdateUser>) {
    const user = await User.findOneAndUpdate({ _id: _user._id }, update, {
      new: true,
      runValidators: true,
    });
    await User.softDelete();

    return user;
  }

  async delete(_user: any) {
    await User.findOneAndRemove(_user);

    await User.softDelete(_user);
  }
}

export default new UserService();
