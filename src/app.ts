import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import { env } from "./config";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.route";
import postRoutes from "./modules/post/post.route";

const app: Application = express();

// Core middlewares
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true, // needed so browser sends/receives cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ success: true, message: "Server is healthy" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 404 + error handler (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
