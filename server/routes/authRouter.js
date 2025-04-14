import  express from "express";
import {register, verifyOTP ,login,logout} from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router =express.Router();

router.post("/register",register);
router.post("/verify-otp",verifyOTP);
router.post("/login",login);
router.get("/logout",isAuthenticated , logout)
router.get("/me",isAuthenticated , getUser)

export default router;

