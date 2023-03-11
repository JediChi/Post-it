import { Types } from "mongoose";
import Comment from "../models/comment.model";
import { IComment } from "../interfaces/comment.interface";

class CommentService {
    async createComment(data: IComment) {
        const  comment = new Comment(data);

        return await comment.save();
    }
}

export default new CommentService();