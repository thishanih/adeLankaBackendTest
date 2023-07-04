import express from "express";
const commentRouter = express.Router();
import { addComment, displayPostComment } from "../services/comment.js";
import { userAuthorization } from "../middleware/authorization.js";

commentRouter.post("/add", userAuthorization(), async (req, res, next) => {
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

commentRouter.get("/:postId", userAuthorization(), async (req, res, next) => {
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
