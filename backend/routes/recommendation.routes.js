const express = require("express");
const { getRecommendations } = require("../controllers/recommendation.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Recommendation Routes
|--------------------------------------------------------------------------
| POST /api/recommendations
| Protected route
*/
router.post("/", authMiddleware, getRecommendations);

module.exports = router;
