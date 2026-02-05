const express = require("express");
const { googleLogin } = require("../controllers/auth.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
| POST /api/auth/google
| Body: { token: <google_id_token> }
*/
router.post("/google", googleLogin);

module.exports = router;
