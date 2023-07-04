import express from "express";
const authRouter = express.Router();
import { login, refreshToken } from "../services/auth.js";

authRouter.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);
    res.status(200).json({
      message: "Successfully created the agent",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/refershToken", async (req, res, next) => {
  try {
    const result = await refreshToken(req.body);
    res.status(200).json({
      message: "Successfully created the agent",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export default authRouter;
