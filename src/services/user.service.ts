import { ICreateUser } from "../interfaces/user.interface";
import { Model } from "mongoose";
import User from "../models/user.model";

class UserService {
    async createUser(data: ICreateUser) {
        const user = await User.create(data);
        
        const token = await user.generateAuthToken();

        return { ...user.toJSON(), token };
    }
}

export default new UserService();


