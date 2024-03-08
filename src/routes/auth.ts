import { Router } from "express";
import { getCurrentUser, login, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const authRoutes: Router = Router();



authRoutes.post("/login", errorHandler(login));

authRoutes.post("/signup", errorHandler(signup));

authRoutes.get("/me", errorHandler(getCurrentUser));

export default authRoutes;
