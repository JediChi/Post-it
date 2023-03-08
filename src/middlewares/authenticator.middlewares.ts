import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization") || "";
    const secret = process.env.SECRET_SIGNATURE || "";
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    if (typeof decoded !== "string" && decoded._id) {
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
      if (!user) {
        throw new Error();
      }
      req.token = token;
      req.user = user;
    }
    next();
  } catch (error) {
    res.status(401).send({ success: false, error: "Please authenticate" });
  }
};

export default auth;
