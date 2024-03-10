import { Router } from "express";
import { errorHandler } from "../error-handler";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users";

const userRoutes:Router = Router();

userRoutes.post("/address", errorHandler(addAddress));
userRoutes.delete("/address/:id", errorHandler(deleteAddress));
userRoutes.get("/address", errorHandler(listAddress));
userRoutes.put("/", errorHandler(updateUser))

export default userRoutes;