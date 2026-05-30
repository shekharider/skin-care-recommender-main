const express = require("express");
const { chat } = require("../controllers/chat.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Chat Routes
|--------------------------------------------------------------------------
| POST /api/chat
| Body: { message: string, history?: Array<{role: string, content: string}> }
| Public route
*/
router.post("/", chat);

module.exports = router;
