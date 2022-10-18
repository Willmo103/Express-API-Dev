const path = require("path");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/home", (req, res, next) => {
  return res.render("homepage");
});

app.listen(process.env.EXTERNAL_PORT || 5050, () => {
  console.log("server listening at http://localhost:5050");
});
