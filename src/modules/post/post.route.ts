import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { authGuard } from "../../middlewares/auth.middleware";
import { createPostSchema, updatePostSchema } from "./post.schema";
import * as postController from "./post.controller";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// Protected routes — only logged-in users can create/update/delete
router.post(
  "/",
  authGuard,
  validate(createPostSchema),
  postController.createPost
);
router.patch(
  "/:id",
  authGuard,
  validate(updatePostSchema),
  postController.updatePost
);
router.delete("/:id", authGuard, postController.deletePost);

export default router;
