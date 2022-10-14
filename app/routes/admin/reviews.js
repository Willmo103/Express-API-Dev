// TODO: set up routes for the admin reviews
const controller = require("../../controllers/admin/reviews");
const router = require("express").Router();

router.get("/", controller.getAll);

module.exports = router;
