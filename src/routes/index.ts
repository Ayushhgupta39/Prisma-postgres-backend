import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

export default router;