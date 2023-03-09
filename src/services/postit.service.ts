import { Types } from "mongoose";
import { ICreatePost } from "../interfaces/postit.interface";
import Post from "../models/postit.model";

class PostService {
  async createPost(data: ICreatePost) {
    const post = new Post(data);

    await post.save();

    return post;
  }
  async getAllPosts(author: Types.ObjectId) {
    const posts = await Post.find({ author, isDeleted: false });
    return posts;
  }

  async getPostById(_id: Types.ObjectId, author: Types.ObjectId) {
    console.log("logging id",_id, author)
    const post = await Post.findOne({ _id, author, isDeleted: false });
    console.log("logging post",post);
    return post;
  }

}

export default new PostService();
