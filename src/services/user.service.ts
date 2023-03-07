import ICreateUser from "../interfaces/user.interface";
import { Model } from "mongoose";
import User from "../models/user.model";

class UserService {
    async createUser(data: Partial<ICreateUser>) {
        const user = await User.create(data);
        const token = await user.generateAuthToken();
        await user.save();
        return { user, token };
    }
}

export default new UserService();