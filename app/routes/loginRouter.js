const router = require("express").Router();
const { loginUser } = require("../utils/0auth2");

router.post("/", loginUser);

module.exports = router;
