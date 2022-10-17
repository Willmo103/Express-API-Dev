const router = require("express").Router();
const {
  deleteOneSave,
  userGetAllOwn,
} = require("../controllers/savedController");
const oauth = require("../utils/0auth2").authorize;

router
  //////// user gets all their own saved products
  .get("/", oauth, userGetAllOwn)
  //////// delete a saved product
  .delete("/:id", oauth, deleteOneSave);

module.exports = router;
