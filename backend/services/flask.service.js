const axios = require("axios");

/*
|--------------------------------------------------------------------------
| Flask ML Service
|--------------------------------------------------------------------------
| Responsible ONLY for communicating with Flask ML API
*/

const FLASK_BASE_URL = "http://localhost:5000";

exports.getRecommendations = async (payload) => {
  try {
    const response = await axios.post(
      `${FLASK_BASE_URL}/recommend`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Flask service error:", error.message);
    throw new Error("Failed to fetch recommendations from ML service");
  }
};
