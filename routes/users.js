const router = require("express").Router();
const { getUsers, createUser, getUserById } = require("../controllers/users");

// route to get all users
router.get("/users", getUsers);
// route to get a single user by ID
router.get("/users/:userId", getUserById);
// route to creat a new user
router.post("/users", createUser);

module.exports = router;
