import { Request, Response } from "express";
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
}

export default new PostController();
