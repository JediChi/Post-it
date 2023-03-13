import Joi from "joi";

export const CreatePost = Joi.object({
    title: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .required(),
    description: Joi.string()
    .min(0)
    .max(255)
    .trim(),
    author: Joi.string().hex().trim().required(),
    text: Joi.string()
    .trim(),
    image: Joi.string()
    .trim(),
    video: Joi.string()
    .trim(),
    audio: Joi.string()
    .trim(),
    comments: Joi.string().hex().trim().optional(),
});

export const UpdatePost = Joi.object({
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    text: Joi.string().trim(),
    image: Joi.string().trim(),
    video: Joi.string().trim(),
    audio: Joi.string()
    .trim(),
    comments: Joi.string().hex().trim().optional(),
})