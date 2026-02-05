// Load environment variables FIRST
require("dotenv").config();

// Import express app
const app = require("./app");

// Port configuration
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
