import { Types } from "mongoose"

export interface ICreatePost{
    _id?: Types.ObjectId,
    userId?: Types.ObjectId,
    postId?: Types.ObjectId,
    title: string,
    description: string,
    author: Types.ObjectId,
    text: string,
    image: string,
    audio: string,
    video: string,
    comment: string,
    isDeleted: boolean,
  softDelete(isDeleted?: boolean): Promise<ICreatePost>;
}

export interface IUpdatePost extends Partial<ICreatePost>{
     voicenote: string,
     isDeleted: boolean,
  softDelete(isDeleted?: boolean): Promise<ICreatePost>;
}