const { getOne, getAll } = require("../controllers/productsController");
const router = require("express").Router();

//R
router.get("/", getAll).get("/:id", getOne);

module.exports = router;
