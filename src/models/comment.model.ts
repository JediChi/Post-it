import mongoose, { Model, Schema } from "mongoose";
import { IComment } from "../interfaces/comment.interface";

const CommentSchema: Schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

CommentSchema.methods.toJSON = function () {
  const comment = this;
  const commentData = comment.toObject();

  delete commentData.isDeleted;

  return commentData;
};



export const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment
