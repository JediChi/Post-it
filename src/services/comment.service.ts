import { Types } from "mongoose";
import Comment from "../models/comment.model";
import { IComment } from "../interfaces/comment.interface";

class CommentService {
  async createComment(data: IComment) {

    const comment = new Comment(data);

    return await comment.save();
  }

  async getAllComments(filter: Partial<IComment>) {
    const comments = await Comment.find({ ...filter, isDeleted: false })
      .populate([{
        path: "author",
        model: "User",
        select: 'name'
      },
      {
        path: "post",
        model: "Post",
        select: "title text"
      }
    ])
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
    const comment = await Comment.findOne({ ...filter, isDeleted: false }).populate([{
      path: "author",
      model: "User",
      select: 'name'
    },
    {
      path: "post",
      model: "Post",
      select: "title text"
    }
  ]);

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

  async delete(filter: Partial<IComment>) {
    const comment: IComment | null | undefined = await Comment.findOneAndUpdate(filter, { isDeleted: true }, {
      runValidators: true
    });

    return comment;
  }

}

export default new CommentService();
