import { ICreatePost } from "../interfaces/postit.interface";
import Post from "../models/postit.model";

class PostService {
    async createPost(data: ICreatePost) {
        const post = new Post(data);

        await post.save();

        return post;
    }
}

export default new PostService();