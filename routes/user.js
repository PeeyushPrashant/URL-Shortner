import express from "express";
import { handleLogin, handleSignup } from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.post("/login", handleLogin);
userRouter.post("/signup", handleSignup);
