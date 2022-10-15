const { getAll } = require("../../controllers/admin/users");
const router = require("express").Router();

router.get("/", getAll);

module.exports = router;
