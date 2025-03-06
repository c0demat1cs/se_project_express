const router = require("express").Router(); // import the express package
const userRouter = require("./users"); // import the users router
const itemRouter = require("./clothingItem"); // import item router
const { login, createUser } = require("../controllers/users"); // import the login and createUser functions
const NotFoundError = require("../customErrors/not-found-err");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../middlewares/validation");

// authentication routes
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserRegistration, createUser);

// allows to register hanlers for different routes
router.use("/users", userRouter); // register the users router
router.use("/items", itemRouter); // register the item router
// middleware to handle an unknown route
router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router; // export the router
