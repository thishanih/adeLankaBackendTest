import { userModel } from "../models/user.model.js";
import HttpError from "../shared/htttp.error.js";
import {
  registrationUserValidation,
  UpdatedValidation,
} from "../shared/validation/user.validation.js";
import bencrypt from "bcryptjs";

// User Register
export const userRegister = async (RegisterData) => {
  const { error } = registrationUserValidation(RegisterData);
  if (error) throw HttpError.badRequest(error.details[0].message);

  // check email already
  const emailExists = await userModel.findOne({ email: RegisterData.email });
  if (emailExists) throw HttpError.badRequest("Email Already Exists");

  const salt = await bencrypt.genSalt(10);
  const hashPassword = await bencrypt.hash(RegisterData.password, salt);

  const user = new userModel({
    firstName: RegisterData.firstName,
    lastName: RegisterData.lastName,
    email: RegisterData.email,
    password: hashPassword,
  });

  const savedAgent = await user.save();
  return savedAgent;
};

// Updated User
export const userUpdate = async (id, reqData) => {
  const { error } = UpdatedValidation(reqData);
  if (error) throw HttpError.badRequest(error.details[0].message);

  const userExists = await userModel.findById({ _id: id });
  if (!userExists) throw HttpError.badRequest("Invalid userID");

  const alreadyUsingEmail = await userModel.findOne({
    _id: { $ne: id },
    email: reqData.email,
  });
  if (alreadyUsingEmail) throw HttpError.badRequest("Email already exists");

  const updateUpdate = await userModel.updateOne(
    { _id: id },
    {
      $set: { ...reqData },
    }
  );

  return;
};

//////////////////////////////////////// Display //////////////////////////
export const displayUser = async (request) => {
  const { page, per_page, search } = request;

  let query = {};

  if (search) {
    query.firstName = { $regex: search };
  }

  const options = {
    page: page,
    limit: per_page,
    sort: {
      createdAt: -1,
    },
  };

  let users = await userModel.paginate(query, options);
  return users;
};
