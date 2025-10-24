import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const api = express.Router();

api.use(authMiddleware); 

api.post("/", createQuestion);
api.get("/", getAllQuestions);
api.get("/:id", getQuestionById);
api.put("/:id", updateQuestion);
api.delete("/:id", deleteQuestion);

export default api;
