import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { IComment } from "../interfaces/comment.interface";
import commentService from "../services/comment.service";
import postitService from "../services/postit.service";

class CommentController {
  async create(req: Request, res: Response) {
    const postId = new Types.ObjectId(req.params.postId);

    const post = await postitService.findPostById(postId);

    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found"
      });
    }

    const newComment = await commentService.createComment({
      ...req.body,
      author: req.user._id,
      post: post._id,
    });

    return res.status(201).send({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  }

  async getAll(req: Request, res: Response) {
    const post = new Types.ObjectId(req.params.postId);

    res.statusCode = 404;
    await commentService.findOneCommentOrFail({post})

    const comments = await commentService.getAllComments(post);

    return res.status(200).send({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  }

  async getOne(req: Request, res: Response) {
    const _id = new mongoose.Types.ObjectId(req.params.id);

    const post = new mongoose.Types.ObjectId(req.params.postId);


    res.statusCode = 404;

    const comment = await commentService.findOneOrFail({ _id, post });

    return res.status(200).send({
      success: true,
      message: "Comment fetched successfully",
      data: comment,
    });
  }

  async update(req: Request, res: Response) {
    const filter: Partial<IComment> = {
      _id: new Types.ObjectId(req.params.id),
      post: new Types.ObjectId(req.params.postId),
      author: new Types.ObjectId(req.user._id)
    };

    const updatedComment = await commentService.updateComment(filter, req.body);

    return res.status(200).send({
      success: true,
      message: "Post updated successfully",
      data: updatedComment,
    });
  }

  async delete(req: Request, res: Response) {
    const filter: Partial<IComment> = { 
      _id: new Types.ObjectId(req.params.id), 
      post: new Types.ObjectId(req.params.postId),
      author: new Types.ObjectId(req.user._id)
    }
    const deletedComment = await commentService.delete(filter)
  
    if (!deletedComment?._id) {
      return res.status(404).send({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Comment deleted successfully",
    });
  }

}

export default new CommentController();
