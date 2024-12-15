const router = require("express").Router(); // import the express package
const userRouter = require("./users"); // import the users router
const itemRouter = require("./clothingItem"); // import item router

// allows to register hanlers for different routes
router.use("/users", userRouter); // register the users router
router.use("/items", itemRouter); // register the item router
module.exports = router; // export the router
