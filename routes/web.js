import express from "express";
import { register, login, profile } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const web = express.Router();

web.post("/register", register);
web.post("/login", login);
web.get("/profile", authMiddleware, profile);

export default web;
