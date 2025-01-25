const router = require("express").Router(); // import the express package
const auth = require("../middlewares/auth");

// STEP 4: REMOVE THE FOLLOWING ROUTES
const { getCurrentUser, updateCurrentUser } = require("../controllers/users"); // import the route handlers

// protect routes
router.use(auth);

// protected routes:
// get user
router.get("/me", getCurrentUser);
// update user
router.patch("/me", updateCurrentUser);
// export the router
module.exports = router;
