import Joi from "joi";

export const CreateComment = Joi.object({
  comment: Joi.string().min(1).max(256).trim().required(),
});
export const UpdateComment = Joi.object({
  comment: Joi.string().trim().required(),
});
