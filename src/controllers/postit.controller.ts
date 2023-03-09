import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import postitService from "../services/postit.service";

class PostController {
  async create(req: Request, res: Response) {
    const imagePath = req.file ? req.file.path : null;
    const audioPath = req.file ? req.file.path : null;
    const videoPath = req.file ? req.file.path : null;
    const newPost = await postitService.createPost(
      { ...req.body, author: req.user._id, image: imagePath, audio: audioPath, video: videoPath}
    );

    return res.status(201).send({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  }

  async getOne(req: Request, res: Response) {
    const _id  = new mongoose.Types.ObjectId(req.params.id)
    const author = new mongoose.Types.ObjectId(req.user._id)
    const post = await postitService.getPostById(_id, author);

    return res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  }

  async getAllPosts(req: Request, res: Response) {
    const author = new mongoose.Types.ObjectId(req.user._id);
    const posts = await postitService.getAllPosts(author);

    return res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  }
}

export default new PostController();
