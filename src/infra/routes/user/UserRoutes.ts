import { Router } from "express";
import UserController from "../../controllers/user/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.get("/", userController.getAll);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export default userRoutes;