const controller = require("../controllers/devController");
const router = require("express").Router();

router.get("/version", controller.version);

module.exports = router;
