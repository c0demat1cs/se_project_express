const router = require("express").Router(); // import the express package
const auth = require("../middlewares/auth");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users"); // import the route handlers
const { validateUserUpdate } = require("../middlewares/validation");

// protect routes
router.use(auth);

// protected routes:
// get user
router.get("/me", getCurrentUser);
// update user
router.patch("/me", validateUserUpdate, updateCurrentUser);
// export the router
module.exports = router;
