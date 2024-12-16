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
router.post("/", createItem);
// get all items
router.get("/", getItems);
// update an item by ID
router.put("/:itemId", updateItem);
// delete an item by ID
router.delete("/:itemId", deleteItem);
// like an item by ID
router.put("/:itemId/like", likeItem);
// dislike an item by ID
router.delete("/:itemId/dislike", dislikeItem);

// router.use((req, res) => {
//   res.status(500).send({ message: "Router not found" });
// });

// export
module.exports = router;
