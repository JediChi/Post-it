import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ICreateUser from "../interfaces/user.interface";

const generateRandomAvatar = async  (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const _email = email.replace(" ", "");
  
    const isValidEmail = emailRegex.test(_email);
    if (!isValidEmail) {
      throw new Error("Invalid email");
    }
  
    const entropySource = () => Math.random().toString(36).substring(2, 7);
  
    const replaceAt = `-${entropySource()}-`;
    const replaceDot = `-${entropySource()}-`;
  
    const seed = _email.replace("@", replaceAt).replace(".", replaceDot);
  
    const randomAvatarStyle = getRandomAvatarStyle(avatarStyles);
  
    if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
      // console.error('Invalid avatar style') // log this error to the console
      throw new Error("Something failed: ");
    }
  
    const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;
  
    return avatarUrl;
  };

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
      type: String,
    //   function() { return generateRandomAvatar(this.email) } ,
    //   required: true,
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

userSchema.pre('save', function(next) {
    this.avatar = generateRandomAvatar(this.email);
    next();
  });

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
