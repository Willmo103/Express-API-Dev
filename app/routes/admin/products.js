const controller = require("../../controllers/admin/products");
const router = require("express").Router();

//CUD
router
  .post("/", controller.createOne)
  .put("/:id", controller.updateOne)
  .delete("/:id", controller.deleteOne);

module.exports = router;
