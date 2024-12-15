const router = require("express").Router();

const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItem");

// create a new item
router.post("/items", createItem);
// get all items
router.get("/items", getItems);
// update an item by ID
router.put("/items/:itemId", updateItem);
// delete an item by ID
router.delete("/items/:itemId", deleteItem);

// router.use((req, res) => {
//   res.status(500).send({ message: "Router not found" });
// });

// export
module.exports = router;
