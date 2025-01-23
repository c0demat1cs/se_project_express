const router = require("express").Router(); // import the express package

// STEP 4: REMOVE THE FOLLOWING ROUTES
const {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
} = require("../controllers/users"); // import the route handlers

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);
// export the router
module.exports = router;
