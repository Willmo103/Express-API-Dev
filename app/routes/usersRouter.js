//Review Controller Imports
const {
  getAllOwnReviews,
  getAllReviewsById,
  updateOneReview,
  deleteOneReview,
} = require("../controllers/reviewsController");
// User controller Imports
const {
  getSelf,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} = require("../controllers/usersController");
// Save Controller Imports
const {
  getAllByUserId,
  userGetAllOwn,
  deleteOneSave,
} = require("../controllers/savedController");
const oauth = require("../utils/0auth2").authorize;

// Initialize Router
const router = require("express").Router();

//PATH: .../users...
router
  //-----------USERS:
  //////// valid user gets their own info
  .get("/", oauth, getSelf)
  //////// user gets all their own info */
  .get("/:id", oauth, getOneUser)
  //////// create a user
  .post("/", createOneUser)
  //////// user updates their own info
  .put("/:id", oauth, updateOneUser)
  //////// user deletes their account
  .delete("/:id", oauth, deleteOneUser)

  //-----------REVIEWS:
  //////// user gets all their own reviews
  .get("/reviews", oauth, getAllOwnReviews)
  //////// get all of a users reviews
  .get("/:id/reviews", oauth, getAllReviewsById)
  //////// user updates a review by id
  .put("/reviews/:id", oauth, updateOneReview)
  //////// user deletes a review by id
  .delete("/reviews/:id", oauth, deleteOneReview)

  //------------SAVED PRODUCTS:
  //////// get all saved by id
  .get("/:id/saved", oauth, getAllByUserId)
  ////////
  .delete("/saved/:id", oauth, deleteOneSave);
////////
module.exports = router;
