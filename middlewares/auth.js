const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnautherizedError = require("../customErrors/unauthorized-err");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // Check if the Authorization header is present
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnautherizedError();
  }
  // try block to verify the token
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    // Verify the token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // Handle token verification errors
    throw new UnautherizedError();
  }
  // Attach the payload to the request
  req.user = payload;

  return next();
};

module.exports = auth;
