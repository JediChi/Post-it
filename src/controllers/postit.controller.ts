import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { ICreatePost } from "../interfaces/postit.interface";
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

    res.statusCode = 404;

    const post = await postitService.findOneOrFail({_id, author});

    // if(!post?._id) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Post not found",
    //   });
    // }

    return res.status(200).send({
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  }

  async getAllPosts(req: Request, res: Response) {
    const author = (req.user._id);
    console.log(author)
    const posts = await postitService.getAllPosts(author);

    return res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  }

  async update(req: Request, res: Response) {
    const filter: Partial<ICreatePost> = { 
      _id: new Types.ObjectId(req.params.id), 
      author: req.user._id
    }

    const updatedPost = await postitService.updatePost(filter, req.body)

    return res.status(200).send({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  }

  async delete(req: Request, res: Response) {
    const filter: Partial<ICreatePost> = { 
      _id: new Types.ObjectId(req.params.id), 
      author: new Types.ObjectId(req.user._id)
    }
    console.log('here....', req.params)
    const deletedPost = await postitService.delete(filter)
  
    if (!deletedPost?._id) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Post deleted successfully",
    });
  }
}

export default new PostController();
