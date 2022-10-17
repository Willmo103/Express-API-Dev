const controller = require("../controllers/devController");
const router = require("express").Router();

router
  .get("/version", controller.version)
  .get("/buildTable", controller.fillProducts)
  .get("/testStatusClass", controller.testStatus);

module.exports = router;
