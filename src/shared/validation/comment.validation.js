import Joi from "joi";

export const addCommentValidation = (data) => {
  const userSchema = Joi.object({
    commentNote: Joi.string().max(500).required(),
    post: Joi.string().required(),
    user: Joi.string().required(),
  });
  return userSchema.validate(data);
};
