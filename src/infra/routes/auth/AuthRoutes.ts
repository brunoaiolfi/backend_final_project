import { Router } from "express";
import AuthController from "../../controllers/auth/AuthController";
import UserController from "../../controllers/user/UserController";

const authRoutes = Router();
const authController = new AuthController();
const userController = new UserController();

authRoutes.post("/login", authController.login);
authRoutes.post("/logon", userController.create);

export default authRoutes;