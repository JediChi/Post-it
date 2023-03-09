import { Types } from "mongoose";
import { ICreatePost } from "../interfaces/postit.interface";
import Post from "../models/postit.model";

class PostService {
  async createPost(data: ICreatePost) {
    const post = new Post(data);

    await post.save();

    return post;
  }

  async getPostById(_id: Types.ObjectId, _author: Types.ObjectId) {
    const post = await Post.findOne({ _id, _author, isDeleted: false });
    return post;
  }

  async getAllPosts(_author: Types.ObjectId) {
    const posts = await Post.find({ isDeleted: false });
    return posts;
  }
}

export default new PostService();
