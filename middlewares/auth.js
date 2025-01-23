const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Check if the Authorization header is present
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  // try block to verify the token
  try {
    const token = authorization.replace("Bearer ", "");
    // Verify the token
    const payload = jwt.verify(token, JWT_SECRET);
    // Attach the payload to the request
    req.user = payload;

    return next();
  } catch (err) {
    // Handle token verification errors
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
};
