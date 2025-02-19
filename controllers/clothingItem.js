const ClothingItem = require("../models/clothingItem"); // import the ClothingItem model
const BadRequestError = require("../customErrors/bad-request-err");
const NotFoundError = require("../customErrors/not-found-err");
const ForbiddenError = require("../customErrors/forbidden-err");

// route handler to create a new item
const createItem = (req, res, next) => {
  // pull information from the body of the request
  const { name, weather, imageUrl } = req.body;
  // create a new item
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => {
      // if successful
      res.send({ data: item }); // recieve the item
    })
    .catch((err) => {
      // if not successful
      console.error(err); // log the error
      if (err.name === "ValidationError") {
        next(
          new BadRequestError("Invalid data provided for creating an item.")
        );
      } else {
        next(err);
      }
    });
};

// route handler to get all items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      next(err);
    });
};

// delete an item by ID
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const { _id: userId } = req.user;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      // Check if the logged-in user is the owner of the item
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError(
          "You do not have permission to delete this item"
        );
      }
      // If the user is the owner, delete the item
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.send({ message: "Item successfully deleted" })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// like an item by ID
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // Add user ID if not already present
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    }) // If item is not found, throw an error
    .then((item) => {
      res.setHeader("Content-Type", "application/json");
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// Dislike (unlike) an item
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      res.setHeader("Content-Type", "application/json");
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format"));
      } else {
        next(err);
      }
    });
};

// export the route handler
module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
