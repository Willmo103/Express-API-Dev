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
const { getAllByUserId } = require("../controllers/savedController");
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
  //////// get all of a users reviews
  .get("/:id/reviews", oauth, getAllReviewsById)
  //------------SAVED PRODUCTS:
  //////// get all saved by id
  .get("/:id/saved", oauth, getAllByUserId);

module.exports = router;
