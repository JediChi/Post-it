import mongoose, { Model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";
import  {
  generateRandomAvatar,
} from "../avatar_styles/avatar.styles";

interface ILoginModel extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser>
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 250,
      trim: true,
    },
    avatar: {
      type: String
    },
    img: {
      type: String
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// this method deletes the sensitive information and returns non-sensitive to the user
userSchema.methods.toJSON = function () {
  const user = this;
  const userData = user.toObject();

  delete userData.password;
  delete userData.tokens;

  return userData;
};

userSchema.methods.generateAuthToken = async function () {
  const secret_key = <string>(<unknown>process.env.SECRET_SIGNATURE);
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, secret_key);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error("Unable to login")
  }
  const isMatchPassword: boolean = await bcrypt.compare(password, user.password)
  if (!isMatchPassword) {
    throw new Error("Unable to login")
  }
  return user;
}

userSchema.pre("save", async function (next) {
  const user = this;
  
  if (user.isModified("password") || user.isNew) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  const avatarUrl = await generateRandomAvatar(user.email);
  const imgTag = `<img src="${avatarUrl}" alt="Avatar">`;
  user.avatar = avatarUrl;
  user.img = imgTag;

  next();
  
});



export const User = mongoose.model<IUser, ILoginModel>("User", userSchema);

export default User;
