const router = require("express").Router(); // import the express package
const { getUsers, createUser, getUserById } = require("../controllers/users"); // import the route handlers

// route to get all users
router.get("/", getUsers);
// route to get a single user by ID
router.get("/:userId", getUserById);
// route to creat a new user
router.post("/", createUser);
// export the router
module.exports = router;
