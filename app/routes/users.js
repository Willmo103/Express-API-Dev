const reviewController = require("../controllers/reviews");
const userController = require("../controllers/users");
const saveController = require("../controllers/saved");
const router = require("express").Router();
const oauth = require("../utils/0auth2").authorize;

//CRUD
router
  //-----------USERS:
  //////// user gets all their own info */
  .get("/:id", oauth, userController.getOne)
  //////// create a user
  .post("/", userController.createOne)
  //////// user updates their own info
  .put("/:id", oauth, userController.updateOne)
  //////// user deletes their account
  .delete("/:id", oauth, userController.deleteOne)

  //-----------REVIEWS:
  //////// user gets all their own reviews
  .get("/reviews/", oauth, reviewController.getAllOwn)
  //////// get all of a users reviews
  .get("/:id/reviews", oauth, reviewController.getAllById)
  //////// get a single review by id
  .get("/reviews/:id", reviewController.getOne)
  //////// user cerates a review
  .post("/reviews", oauth, createOne)
  //////// user updates a review by id
  .put("/reviews/:id", oauth, updateOne)
  //////// user deletes a review by id
  .delete("/reviews/:id", oauth, deleteOne)

  //------------SAVED PRODUCTS:
  //////// user gets all their saved products
  .get("/saved", oauth, saveController.userGetAllOwn)
  //////// get all saved by id
  .get(":id/saved", oauth, saveController.getAllByUserId)
  ////////
  .put("/saved", oauth, saveController.saveOne)
  ////////
  .delete("/saved", oauth, saveController.deleteOne);
////////
module.exports = router;
