const {
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getAll,
} = require("../controllers/reviews");
const router = require("express").Router();
const oauth = require("../utils/0auth2").authorize;

router
  .get("/", oauth, getAll)
  .get("/:id", getOne)
  .post("/", oauth, createOne)
  .put("/:id", oauth, updateOne)
  .delete("/:id", oauth, deleteOne);

module.exports = router;
