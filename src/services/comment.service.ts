import { Types } from "mongoose";
import Comment from "../models/comment.model";
import { IComment } from "../interfaces/comment.interface";

class CommentService {
  async createComment(data: IComment) {
    const comment = new Comment(data);

    return await comment.save();
  }

  async getAllComments(post: Types.ObjectId) {
    const comments = await Comment.find({ post, isDeleted: false })
      .populate({
        path: "author",
        model: "User",
        select: "_id",
        populate: {
          path: "posts",
          model: "Post",
          select: "_id",
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    return comments;
  }

  // this is for getting all the deleted comments
  async getCommentById(filter: Partial<IComment>) {
    const comment = await Comment.findOne({ ...filter });
    return comment;
  }

  async findOneOrFail(filter: Partial<IComment>) {
    const comment = await Comment.findOne({ ...filter, isDeleted: false });

    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  }

  async updateComment(filter: Partial<IComment>, update: Partial<IComment>) {
    const comment = await Comment.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true
    });

    return comment;
  }
}

export default new CommentService();
