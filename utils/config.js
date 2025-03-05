const JWT_SECRET = process.env.JWT_SECRET || "passWord1234";

console.log(JWT_SECRET);
module.exports = {
  JWT_SECRET,
};
