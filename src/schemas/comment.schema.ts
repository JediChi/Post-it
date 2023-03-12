import Joi from "joi";

export const CreateComment = Joi.object({
  author: Joi.string().hex().trim(),
  post: Joi.string().hex().trim(),
  comment: Joi.string().trim().required(),
});
export const UpdateComment = Joi.object({
  comment: Joi.string().trim().required(),
});
