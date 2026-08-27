import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { authGuard } from "../../middlewares/auth.middleware";
import { registerSchema, loginSchema } from "./auth.schema";
import * as authController from "./auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", authGuard, authController.me);

export default router;
