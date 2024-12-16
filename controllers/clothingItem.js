const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

// route handler to create a new item
const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  // pull information from the body of the request
  const { name, weather, imageUrl, likes, createdAt } = req.body;
  // create a new item
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
    likes,
    createdAt,
  })
    .then((item) => {
      // if successful
      res.status(201).send({ data: item }); // recieve the item
    })
    .catch((err) => {
      // if not successful
      console.error(err); // log the error
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from createItem", err });
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
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from getItems", err });
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
      res.status(SERVER_ERROR).send({ message: "Error from updateItem", err });
    });
};

// delete an item by ID
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "Error from deleteItem", err });
    });
};

// like an item by ID
const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // Add user ID if not already present
    { new: true }
  )
    .orFail(new Error("ItemNotFound"))
    .then((item) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "ItemNotFound") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error liking item" });
    });
};

// Dislike (unlike) an item
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("ItemNotFound"))
    .then((item) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "ItemNotFound") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(SERVER_ERROR).send({ message: "Error liking item" });
    });
};

// export the route handler
module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
