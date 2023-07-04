import express from "express";
const commentRouter = express.Router();
import { addComment, displayPostComment } from "../services/comment.js";

commentRouter.post("/add", async (req, res, next) => {
  try {
    const result = await addComment(req.body);
    res.status(200).json({
      message: "Successfully comment the post",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

commentRouter.get("/:postId", async (req, res, next) => {
  try {
    const result = await displayPostComment(req.params.postId);
    res.status(200).json({
      message: "Successfully display all post comment",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export default commentRouter;
