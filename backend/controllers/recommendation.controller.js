const flaskService = require("../services/flask.service");

/*
|--------------------------------------------------------------------------
| Recommendation Controller
|--------------------------------------------------------------------------
| Receives validated request
| Calls Flask ML service
| Sends response back to client
*/


exports.getRecommendations = async (req, res) => {
  try {
    const { skin_type, concern_1, concern_2, concern_3 } = req.body;

    // Basic validation
    if (skin_type === undefined || skin_type === null) {
      return res.status(400).json({ message: "skin_type is required" });
    }

    // Call Flask ML service
    const recommendations = await flaskService.getRecommendations({
      skin_type,
      concern_1,
      concern_2,
      concern_3,
    });

    // Send response to frontend

    res.status(200).json({
      message: "Recommendations fetched successfully",
      data: recommendations,
    });

  } catch (error) {
    console.error("Recommendation error:", error.message);
    res.status(500).json({ message: "Failed to get recommendations" });
  }
};
