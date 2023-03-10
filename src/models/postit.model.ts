import mongoose, {Model, Schema} from  "mongoose";
import { ICreatePost } from "../interfaces/postit.interface";

interface IPost extends Model<ICreatePost>{
    voicenote: string,
    isDeleted: boolean,
  softDelete(isDeleted?: boolean): Promise<ICreatePost>;
}

const postSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        trim: true
    },
    image: {
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

postSchema.methods.toJSON = function () {
    const post = this;
    const postData = post.toObject();

    delete postData.isDeleted;
  
    return postData;
  };

postSchema.statics.softDelete = async function(id: string) {
    const post = this
    // const result = await post.findOneAndUpdate(id, { isDeleted: true }, { new: true });
    
    return 'result';
  
    
  };

export const Post = mongoose.model<ICreatePost, IPost>("Post", postSchema);

export default Post;