const {
  createOne,
  updateOne,
  deleteOne,
} = require("../../controllers/admin/products");
const router = require("express").Router();

//CUD
router.post("/", createOne).put("/:id", updateOne).delete("/:id", deleteOne);

module.exports = router;
