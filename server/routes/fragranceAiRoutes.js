import express from "express";
import {
  AIFragranceRecommendations,
  AIFragranceChat,
} from "../controllers/AiFragranceController.js";

const router = express.Router();

router.post("/recommendations", AIFragranceRecommendations);
router.post("/chat", AIFragranceChat);

export default router;
