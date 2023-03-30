import { Router } from "express";
import UserController from "../controllers/UserController";


const router = Router();
router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);

export default router;