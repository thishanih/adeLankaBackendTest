import Joi from "joi";

////////////////////// Register User  //////////////////////////
export const registrationUserValidation = (data) => {
  const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(2).max(100).required().email(),
    password: Joi.string().min(8).max(35).required(),
  });
  return userSchema.validate(data);
};

////////////////////// updated User  //////////////////////////
export const UpdatedValidation = (data) => {
  const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(2).max(100).required().email(),
  });
  return userSchema.validate(data);
};
