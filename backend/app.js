// Core express import
const express = require("express");

// Middleware imports
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Route imports
const authRoutes = require("./routes/auth.routes");
const recommendationRoutes = require("./routes/recommendation.routes");

// Create express app
const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

// Parse incoming JSON requests
app.use(bodyParser.json());

// Enable CORS (required for cookies + frontend)
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,               // allow cookies
  })
);

// Parse cookies from requests
app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Authentication routes
app.use("/api/auth", authRoutes);

// Recommendation routes (protected internally)
app.use("/api/recommendations", recommendationRoutes);

/*
|--------------------------------------------------------------------------
| Health Check (Optional but useful)
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend is running" });
});

// Export app (server.js will start it)
module.exports = app;
