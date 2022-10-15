const {getAll, getOne} = require("../controllers/saved")
const router = require('express').Router()
const auth = require('../utils/0auth2').authorize

router.get("/reviews", auth, getOne).get("/:id/reviews", getAll).post("/reviews", auth, saveOne)
