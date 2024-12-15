const ClothingItem = require("../models/clothingItem");

// route handler to create a new item
const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl, owner, likes, createdAt } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner, likes, createdAt })
    .then((item) => {
      // if successful
      res.status(201).send(item); // recieve the item
    })
    .catch((err) => {
      // if not successful
      console.error(err); // log the error
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: "Error from createItem", err });
    });
};

// route handler to get all items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: "Error from getItems", err });
    });
};

// update an item by ID
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res.status(500).send({ message: "Error from updateItem", err });
    });
};

// delete an item by ID
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      if (item) {
        res.status(204).send({ message: "Item deleted" });
      } else {
        res.status(404).send({ message: "Item not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};

// like an item by ID
module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item)) // Send the updated item
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(500).send({ message: "Error liking item", err });
    });
};

// Dislike (unlike) an item
module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // Remove user ID from likes array
    { new: true } // Return the updated document
  )
    .orFail()
    .then((item) => res.status(200).send(item)) // Send the updated item
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.status(500).send({ message: "Error disliking item", err });
    });
};

// export the route handler
module.exports = { getItems, createItem, updateItem, deleteItem };
