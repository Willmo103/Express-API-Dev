const controller = require("../controllers/reviews");
const router = require("express").Router();

router.get("/", controller.getAll);

module.exports = router;
