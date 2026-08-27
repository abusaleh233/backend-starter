import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { env } from "../../config";
import * as authService from "./auth.service";

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax" as const,
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await authService.loginUser(
    req.body
  );

  res
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: "Logged in successfully",
      data: user,
    });
});

export const logout = catchAsync(async (_req: Request, res: Response) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .status(StatusCodes.OK)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const me = catchAsync(async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    data: req.user,
  });
});
