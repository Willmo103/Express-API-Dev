// Products Controller Imports
const {
  getOneProduct,
  getAllProducts,
} = require("../controllers/productsController");
// Review Controller Imports
const {
  createOneReview,
  getAllByProductId,
} = require("../controllers/reviewsController");
// Save Controller Imports
const { saveOne } = require("../controllers/savedController");
// Path Authorization Middleware
const oauth = require("../utils/0auth2").authorize;

// Initialize Router
const router = require("express").Router();

// Path .../products...
router
  //////// Returns all products
  .get("/", getAllProducts)
  //////// Returns Single product by id
  .get("/:id", getOneProduct)
  //////// Returns all reviews for a single product by that product's id
  .get("/:id/reviews", oauth, getAllByProductId)
  //////// User cerates a review for product by it's id
  .post("/:id/reviews", oauth, createOneReview)
  //////// User saves a product to their favorites by it's id
  .post("/:id/saved", oauth, saveOne);
module.exports = router;
