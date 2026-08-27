import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid post id"),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>["body"];
export type UpdatePostInput = z.infer<typeof updatePostSchema>["body"];
