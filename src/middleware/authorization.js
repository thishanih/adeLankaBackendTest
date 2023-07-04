import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { userStatus } from "../shared/constants.js";

export const userAuthorization = () => {
  return async function (req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) return res.status(401).json("Access Denied");

    try {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const verified = await jwt.verify(bearerToken, process.env.TOKEN_SECRET);

      const userExists = await userModel.findById({ _id: verified._id });

      if (userExists.userStatus === userStatus.inactive) {
        return res.status(401).json("Currently User Inactive");
      } else {
        next();
      }
    } catch (err) {
      res.status(401).json("Invalid Token");
    }
  };
};
