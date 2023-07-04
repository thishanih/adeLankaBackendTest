import express from "express";

import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import postRouter from "./post.router.js";
import commentRouter from "./comment.router.js";

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/comment", commentRouter);

export default apiRouter;
