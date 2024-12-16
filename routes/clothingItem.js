const router = require("express").Router();

const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// create a new item
router.post("/items", createItem);
// get all items
router.get("/items", getItems);
// update an item by ID
router.put("/items/:itemId", updateItem);
// delete an item by ID
router.delete("/items/:itemId", deleteItem);
// like an item by ID
router.put("/items/:itemId/like", likeItem);
// dislike an item by ID
router.put("/items/:itemId/dislike", dislikeItem);

// router.use((req, res) => {
//   res.status(500).send({ message: "Router not found" });
// });

// export
module.exports = router;
