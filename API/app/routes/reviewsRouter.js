const router = require("express").Router();
const {
  getAllOwnReviews,
  updateOneReview,
  deleteOneReview,
  getOneReview,
} = require("../controllers/reviewsController");
const oauth = require("../utils/0auth2").authorize;

router
  //////// user gets all their own reviews
  .get("/", oauth, getAllOwnReviews)
  //////// Returns a single review by id
  .get("/:id", getOneReview)
  //////// user updates a review by id
  .put("/:id", oauth, updateOneReview)
  //////// user deletes a review by id
  .delete("/:id", oauth, deleteOneReview);
module.exports = router;
