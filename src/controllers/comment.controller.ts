import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { IComment } from "../interfaces/comment.interface";
import commentService from "../services/comment.service";

class CommentController {
    async create(req: Request, res: Response) {
        // const author = req.user._id
        const post = req.params.id
        const newComment = await commentService.createComment({ ...req.body, post});

        return res.status(201).send({
            success: true,
            message: "Comment created successfully",
            data: newComment
        })
    }

    async getAll(req: Request, res: Response) {
        // const author = req.user._id
        const post = req.params.id
        const comments = await commentService.getAllComments( post);

        return res.status(200).send({
            success: true,
            message: "Comments fetched successfully",
            data: comments
        });
    }
}

export default new CommentController();