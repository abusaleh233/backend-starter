import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { CreatePostInput, UpdatePostInput } from "./post.schema";

export const createPost = async (authorId: string, data: CreatePostInput) => {
  return prisma.post.create({
    data: {
      ...data,
      authorId,
    },
  });
};

export const getAllPosts = async () => {
  return prisma.post.findMany({
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
  });

  if (!post) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Post not found");
  }

  return post;
};

export const updatePost = async (
  id: string,
  authorId: string,
  data: UpdatePostInput
) => {
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Post not found");
  }

  if (post.authorId !== authorId) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to update this post"
    );
  }

  return prisma.post.update({
    where: { id },
    data,
  });
};

export const deletePost = async (id: string, authorId: string) => {
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Post not found");
  }

  if (post.authorId !== authorId) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to delete this post"
    );
  }

  await prisma.post.delete({ where: { id } });
};
