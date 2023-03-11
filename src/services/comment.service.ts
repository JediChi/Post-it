import { Types } from "mongoose";
import Comment from "../models/comment.model";
import { IComment } from "../interfaces/comment.interface";

class CommentService {
    async createComment(data: IComment) {
        const  comment = new Comment(data);

        return await comment.save();
    }

    async getAllComments( post: string) {
        const comments = await Comment.find({ post, isDeleted: false }).populate({
            path: "author",
            model: "User",
            select: '_id',
            populate: {
                path: "posts",
                model: "Post",
                select: '_id',
            }
        }).sort({createdAt: -1}).exec();

        return comments;
    }
}

export default new CommentService();