import express from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";

const apiRouter = express.Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/post", authRouter);

export default apiRouter;
