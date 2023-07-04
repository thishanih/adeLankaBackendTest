import express from "express";
const userRouter = express.Router();
import { userRegister, userUpdate, displayUser } from "../services/user.js";

// post
userRouter.post("/add", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await userRegister(req.body);
    res.status(200).json({
      message: "Successfully created the agent",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

userRouter.put("/edit/:id", async (req, res, next) => {
  try {
    await userUpdate(req.params.id, req.body);

    res.status(200).json({
      message: "Successfully user updated",
    });
  } catch (err) {
    next(err);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const result = await displayUser(req.query);
    res.status(200).json({
      message: "Successfully user diaplay",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export default userRouter;
