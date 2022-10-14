const controller = require("../controllers/products");
const router = require("express").Router();

//R
router.get("/", controller.getAll).get("/:id", controller.getOne);

module.exports = router;
