// Load environment variables FIRST
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Import express app
const app = require("./app");

// Port configuration
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
