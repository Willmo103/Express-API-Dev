const router = require("express").Router();
const { getAllOwn } = require("../controllers/savedController");
const oauth = require("../utils/0auth2").authorize;

router.get("/", oauth, getAllOwn);
