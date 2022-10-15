const {
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/users");
const router = require("express").Router();
const oauth = require("../utils/0auth2").authorize;

//CRUD
router
  .get("/:id", oauth, getOne)
  .post("/", createOne)
  .put("/:id", oauth, updateOne)
  .delete("/:id", oauth, deleteOne);

module.exports = router;
