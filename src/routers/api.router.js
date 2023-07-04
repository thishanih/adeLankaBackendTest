import express from "express";

import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import postRouter from "./post.router.js";

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/post", postRouter);

export default apiRouter;
