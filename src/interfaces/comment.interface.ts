import { Types } from "mongoose";

export interface IComment {
    _id?: Types.ObjectId,
    userId?:Types.ObjectId,
    author: Types.ObjectId,
    post: Types.ObjectId,
    text: string
    
}