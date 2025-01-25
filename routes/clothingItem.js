const router = require("express").Router(); // import the express package
const auth = require("../middlewares/auth");
// import the route handlers
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// get all items
router.get("/", getItems);

// protect routes
router.use(auth);

// protected routes:
// create a new item
router.post("/", createItem);
// update an item by ID
router.delete("/:itemId", deleteItem);
// like an item by ID
router.put("/:itemId/likes", likeItem);
// dislike an item by ID
router.delete("/:itemId/likes", dislikeItem);

// export the router
module.exports = router;
