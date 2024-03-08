import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";

const productRoutes:Router = Router();

productRoutes.post("/", errorHandler(createProduct));
productRoutes.put("/:id", errorHandler(updateProduct));
productRoutes.delete("/:id", errorHandler(deleteProduct));
productRoutes.get("/", errorHandler(listProducts));
productRoutes.get("/:id", errorHandler(getProductById));


export default productRoutes;