const express = require("express");
const router = express.Router();

import { AIFragranceRecommendations } from "./AIFragranceRecommendations";

router.post("/recommendations", AIFragranceRecommendations);
