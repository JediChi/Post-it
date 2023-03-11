import { Types } from "mongoose";

export interface IComment {
    _id?: Types.ObjectId,
    author: Types.ObjectId,
    post: Types.ObjectId,
    text: string
    
}