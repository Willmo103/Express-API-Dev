// TODO: set up routes for the admin reviews
const controller = require("../../controllers/admin/reviews");
const router = require("express").Router();

router.get("/", controller.getAll).delete("/:id", controller.deleteOne);

module.exports = router;
