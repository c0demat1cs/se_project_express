// const JWT_SECRET = process.env.JWT_SECRET || "passWord1234";
const { JWT_SECRET = "dev-secret" } = process.env;

console.log(JWT_SECRET);
module.exports = {
  JWT_SECRET,
};
