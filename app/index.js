const express = require("express");
const morgan = require("morgan");
const sequelize = require("./utils/database");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  next();
});
app.use(morgan("common"));
app.use("/dev", require("./routes/dev"));
app.use("/login", require("./routes/login"));
app.use("/users", require("./routes/users"));
app.use("/reviews", require("./routes/reviews"));
app.use("/products", require("./routes/products"));
app.use("/admin/users", require("./routes/admin/users"));
app.use("/admin/reviews", require("./routes/admin/reviews"));
app.use("/admin/products", require("./routes/admin/products"));

// function to creates new tables on startup
(async () => {
  try {
    console.log("Creating Tables....");
    await sequelize.sync({ force: false });
    console.log("Tables Created!");
    app.listen(process.env.EXTERNAL_PORT || 5000, () => {
      console.log("Server Listening: http://localhost:5000");
    });
  } catch (error) {
    console.log("Error! Unable to build database: ", error);
  }
})();
