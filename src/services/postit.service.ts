import { Types } from "mongoose";
import { ICreatePost, IUpdatePost } from "../interfaces/postit.interface";
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
    const post = await Post.findOne({ _id, author, isDeleted: false });

    return post;
  }

  async updatePost(_post: Partial<ICreatePost>, update: Partial<IUpdatePost>) {
    const post = await Post.findOneAndUpdate({ _id: _post._id, author: _post.author}, update, {
        new: true,
        runValidators: true
    });

    await Post.softDelete();

    return post;
  }

  async delete(_post: any) {
    await Post.findOneAndRemove({_id: _post._id, author: _post.author});

    await Post.softDelete(_post);
  }

}

export default new PostService();
