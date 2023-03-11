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
    const posts = await Post.find({ author, isDeleted: false }).populate({
      path: "comments",
      model: "Comment",
      select: "_id",
      populate: {
        path: "author",
        model: "User",
        select: "_id",
      },
    }).sort({ createdAt: -1 }).exec();
    return posts;
    // const posts = await Post.find({ author, isDeleted: false });
    // return posts;
  }

  async getPostById(filter: Partial<ICreatePost>) {
    const post = await Post.findOne({ ...filter });
    // console.log(post)
    return post;
  }

  async findOneOrFail(filter: Partial<ICreatePost>) {
    const post = await Post.findOne({ ...filter, isDeleted: false });
    
    if (!post) {
      throw new Error('No post found')
    }
    return post;
  }

  async updatePost(filter: Partial<ICreatePost>, update: Partial<IUpdatePost>) {
    const post = await Post.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true
    });

    return post;
  }

  async delete(filter: Partial<ICreatePost>) {
    const post: ICreatePost | null | undefined = await Post.findOneAndUpdate(filter, { isDeleted: true }, {
      runValidators: true
    });

    console.log(post)

    return post;
  }

}

export default new PostService();
