import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import * as postService from "./post.service";

export const createPost = catchAsync(async (req: Request, res: Response) => {
  const post = await postService.createPost(req.user!.userId, req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

export const getAllPosts = catchAsync(async (_req: Request, res: Response) => {
  const posts = await postService.getAllPosts();

  res.status(StatusCodes.OK).json({
    success: true,
    data: posts,
  });
});

export const getPostById = catchAsync(async (req: Request, res: Response) => {
  const post = await postService.getPostById(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    data: post,
  });
});

export const updatePost = catchAsync(async (req: Request, res: Response) => {
  const post = await postService.updatePost(
    req.params.id,
    req.user!.userId,
    req.body
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

export const deletePost = catchAsync(async (req: Request, res: Response) => {
  await postService.deletePost(req.params.id, req.user!.userId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Post deleted successfully",
  });
});
