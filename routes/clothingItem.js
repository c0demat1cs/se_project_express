const router = require("express").Router(); // import the express package
// import the route handlers
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// create a new item
router.post("/", createItem);
// get all items
router.get("/", getItems);
// update an item by ID
router.put("/:itemId", updateItem);
// delete an item by ID
router.delete("/:itemId", deleteItem);
// like an item by ID
router.put("/:itemId/likes", likeItem);
// dislike an item by ID
router.delete("/:itemId/likes", dislikeItem);

// router.use((req, res) => {
//   res.status(500).send({ message: "Router not found" });
// });

// export the router
module.exports = router;
