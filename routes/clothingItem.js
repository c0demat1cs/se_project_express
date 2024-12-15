const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItem");

// get all items
router.get("/items", getItems);
// create a new item
router.post("/items", createItem);
// delete an item by ID
router.delete("/items/:itemId", deleteItem);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

// export
module.exports = router;
