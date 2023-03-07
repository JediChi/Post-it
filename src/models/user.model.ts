import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ICreateUser from "../interfaces/user.interface";

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
      type: Function,
      required: true,
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

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

export const User = mongoose.model<ICreateUser>("User", userSchema);

export default User;
