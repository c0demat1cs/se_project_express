const router = require("express").Router(); // import the express package

// STEP 4: REMOVE THE FOLLOWING ROUTES
const { createUser, getCurrentUser, login } = require("../controllers/users"); // import the route handlers

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/me", getCurrentUser);
// export the router
module.exports = router;
