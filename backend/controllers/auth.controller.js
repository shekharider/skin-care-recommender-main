const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    // 1. Get Google ID token from frontend
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token missing" });
    }

    // 2. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    /*
      payload contains:
      - email
      - name
      - picture
      - sub (unique Google user id)
    */

    // 3. (Later) Save or find user in DB
    // For now we only trust Google identity

    // 4. Create BACKEND JWT (important)
    const backendToken = jwt.sign(
      {
        email: payload.email,
        name: payload.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Send token as HTTP-only cookie
    res.cookie("token", backendToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6. Respond success
    res.status(200).json({
      message: "Authentication successful",
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
