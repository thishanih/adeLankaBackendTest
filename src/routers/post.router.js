import express from "express";
const postRouter = express.Router();
import { addPost, displayPost } from "../services/post.js";
import { userAuthorization } from "../middleware/authorization.js";

postRouter.post("/add", userAuthorization(), async (req, res, next) => {
  try {
    const result = await addPost(req.body);
    res.status(200).json({
      message: "Successfully created the post",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

postRouter.get("/", userAuthorization(), async (req, res, next) => {
  try {
    const result = await displayPost(req.query);
    res.status(200).json({
      message: "Successfully post display",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export default postRouter;
