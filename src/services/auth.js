import mongoose from "mongoose";
import bencrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userModel } from "../models/user.model.js";
import { loginValidation } from "../shared/validation/auth.validation.js";
import HttpError from "../shared/htttp.error.js";
import { userStatus } from "../shared/constants.js";


// User Sign in
export const login = async (data) => {
  const { error } = loginValidation(data);
  if (error) throw HttpError.badRequest(error.details[0].message);

  const userExists = await userModel.findOne({ email: data.email });
  if (!userExists) throw HttpError.badRequest("Invalid Email or Password");

  if (userExists.userStatus == userStatus.inactive)
    throw HttpError.badRequest(
      `Currently user status ${userExists.userStatus}`
    );

  const passCheck = await bencrypt.compare(data.password, userExists.password);
  if (!passCheck) throw HttpError.badRequest("Invalid password");

  // set access Token
  const access = jwt.sign(
    {
      _id: userExists.id,
      displayName: userExists.firstName + " " + userExists.lastName,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.SET_TOKEN,
    }
  );

  // Set RefreshToken
  const refreshToken = jwt.sign(
    {
      _id: userExists.id,
      displayName: userExists.firstName + " " + userExists.lastName,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.RESET_TOKEN,
    }
  );

  const authorization = {
    userid: userExists.id,
    userName: userExists.firstName + " " + userExists.lastName,
    userStatus: userExists.userStatus,
    access: access,
    refreshToken: refreshToken,
  };

  return authorization;
};

// Refersh Tokent
export const refreshToken = async (data) => {
  const refreshToken = await data.refreshToken;
  if (!refreshToken) throw HttpError.badRequest("Access Denied");

  const RefreshTokenDecoded = jwt.verify(
    refreshToken,
    process.env.TOKEN_SECRET
  );

  const userExists = await userModel.findById({ _id: RefreshTokenDecoded._id });


  if (userExists.userStatus == userStatus.inactive)
    throw HttpError.badRequest(`currently userStatus ${userExists.userStatus}`);

  if (data.id !== RefreshTokenDecoded._id)
    throw HttpError.badRequest("Not matching Token");

  let user = {
    _id: RefreshTokenDecoded._id,
    displayName: RefreshTokenDecoded.displayName,
  };

  const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.SET_TOKEN,
  });

  return accessToken;
};
