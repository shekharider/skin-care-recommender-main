const express = require("express");
const { getRecommendations } = require("../controllers/recommendation.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Recommendation Routes
|--------------------------------------------------------------------------
| POST /api/recommendations
| Public route
*/
router.post("/", getRecommendations);

module.exports = router;
