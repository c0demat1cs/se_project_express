const JWT_SECRET = process.env.JWT_SECRET || "passWord1234";
// const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = {
  JWT_SECRET,
};
