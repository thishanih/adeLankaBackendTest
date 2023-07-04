import Joi from "joi";

////////////////////// Login User  //////////////////////////
export const loginValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(40).required(),
  });
  return userSchema.validate(data);
};
