const express = require("express");
const { googleLogin, logout, mockLogin } = require("../controllers/auth.controller");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
| POST /api/auth/google
| Body: { token: <google_id_token> }
| 
| POST /api/auth/mock
| Body: { email?: string, name?: string }
| (For testing without Google)
*/
router.post("/google", googleLogin);
router.post("/mock", mockLogin);
router.post("/logout", logout);

module.exports = router;
