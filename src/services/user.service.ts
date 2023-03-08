import { ICreateUser } from "../interfaces/user.interface";
import { Model } from "mongoose";
import User from "../models/user.model";

class UserService {
    async createUser(data: ICreateUser) {
        const user = await User.create(data);
        
        const token = await user.generateAuthToken();

        return { ...user.toJSON(), token };
    }

    async loginUser(email: string, password: string) {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        return { user,token };
    }

    async getAllUsers() {
        const users = await User.find();

        return users.map(user => user.toJSON());
    }
    
}

export default new UserService();


