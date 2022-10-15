// TODO: set up routes for the admin reviews
const { getAll, deleteOne } = require("../../controllers/admin/reviews");
const router = require("express").Router();

router.get("/", getAll).delete("/:id", deleteOne);

module.exports = router;
