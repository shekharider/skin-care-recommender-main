const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Read token from HTTP-only cookie
    const token = req.cookies.token;

    // 2. If no token → block request
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 3. Verify backend JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request (optional but useful)
    req.user = decoded;

    // 5. Allow request to continue
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
