import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { IComment } from "../interfaces/comment.interface";
import commentService from "../services/comment.service";

class CommentController {
    async create(req: Request, res: Response) {
        const newComment = await commentService.createComment({ ...req.body});

        return res.status(201).send({
            success: true,
            message: "Comment created successfully",
            data: newComment
        })
    }
}

export default new CommentController();