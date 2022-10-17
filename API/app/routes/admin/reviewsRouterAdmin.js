// TODO: set up routes for the admin reviews
const {
  getAll,
  deleteOne,
} = require("../../controllers/admin/reviewsControllerAdmin");
const router = require("express").Router();

router.get("/", getAll).delete("/:id", deleteOne);

module.exports = router;
