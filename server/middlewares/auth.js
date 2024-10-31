const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer "))
      return res.status(401).json({ msg: "User not authenticated" });

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, "bankai");
    req.user = { ...payload };
    next();
  } catch (err) {
    res.status(401).json({ msg: "User not authenticated" });
  }
};

module.exports = authMiddleware;
