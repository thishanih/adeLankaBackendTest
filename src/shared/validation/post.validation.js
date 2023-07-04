import Joi from "joi";

////////////////////// Login User  //////////////////////////
export const addPostValidation = (data) => {
  const userSchema = Joi.object({
    title: Joi.string().required(),
    note: Joi.string().min(2).max(400).required(),
    user: Joi.string().required(),
  });
  return userSchema.validate(data);
};
