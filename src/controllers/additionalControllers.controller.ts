import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { IComment } from "../interfaces/comment.interface";
import commentService from "../services/comment.service";
import postitService from "../services/postit.service";
import userService from "../services/user.service";


class AdditionalRouterController{
async getAll(req: Request, res: Response) {
    const user = new Types.ObjectId(req.params.userId);

    res.statusCode = 404;
    const posts = await postitService.getAllPosts(user);

    return res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  }

  async getAllPostsById(req: Request, res: Response) {
    const userId  = new mongoose.Types.ObjectId(req.params.userId)

    const postId = new mongoose.Types.ObjectId(req.params.postId)

    res.statusCode = 404;

    const post = await postitService.findOneOrFail({userId, postId});

    return res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  }

  async getAllCommentsByPostId(req: Request, res: Response) {
    const post = new Types.ObjectId(req.params.postId);
    const userId  = new Types.ObjectId(req.params.userId)

    res.statusCode = 404;
    const comments = await commentService.getAllComments({post, userId});

    return res.status(200).send({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  }

  async getACommentById(req: Request, res: Response) {
    const _id = new mongoose.Types.ObjectId(req.params.id);

    const post = new mongoose.Types.ObjectId(req.params.postId);

    const userId  = new Types.ObjectId(req.params.userId)


    res.statusCode = 404;

    const comment = await commentService.findOneOrFail({ _id, post , userId });

    return res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      data: comment,
    });
  }
}

export default new AdditionalRouterController();