const router = require("express").Router();
const { getUsers, createUser, getUserById } = require("../controllers/users");

// route to get all users
router.get("/", getUsers);
// route to get a single user by ID
router.get("/:userId", getUserById);
// route to creat a new user
router.post("/", createUser);

module.exports = router;
