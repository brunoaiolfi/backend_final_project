import { Router } from "express";
import AuthController from "../../controllers/auth/AuthController";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);

export default authRoutes;