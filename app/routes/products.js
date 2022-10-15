const { getOne, getAll } = require("../controllers/products");
const router = require("express").Router();

//R
router.get("/", getAll).get("/:id", getOne);

module.exports = router;
