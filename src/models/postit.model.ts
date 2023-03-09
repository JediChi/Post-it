import mongoose, {Model, Schema} from  "mongoose";
import { ICreatePost } from "../interfaces/postit.interface";

const postSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        trim: true
    },
    audio:{
        type: String
    },
    video: {
        type: String
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    
});

export const Post = mongoose.model<ICreatePost>("Post", postSchema);

export default Post;