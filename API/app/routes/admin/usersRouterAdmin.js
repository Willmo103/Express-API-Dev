const { getAll } = require("../../controllers/admin/usersControllerAdmin");
const router = require("express").Router();

router.get("/", getAll);

module.exports = router;
