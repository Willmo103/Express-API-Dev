// Imports
const express = require("express");
const morgan = require("morgan");
const sequelize = require("./utils/database");

//----Initialize App
const app = express();

//----Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  next();
});

//-----API
//
//-----PUBLIC ROUTES
//
//
//-----Dev version
app.use("/api/v1/dev", require("./routes/devRouter"));
//-----Login
app.use("/api/v1/login", require("./routes/loginRouter"));
//-----Users
app.use("/api/v1/users", require("./routes/usersRouter"));
//-----Products
app.use("/api/v1/products", require("./routes/productsRouter"));
//-----Reviews
app.use("/api/v1/reviews", require("./routes/reviewsRouter"));
//-----Saved
app.use("/api/v1/saved", require("./routes/savedRouter"));
//
//-----RESTRICTED ROUTES
//
//-----ADMIN User endpoints
app.use("/api/v1/admin/users", require("./routes/admin/usersRouterAdmin"));
//-----ADMIN Reviews endpoints
app.use("/api/v1/admin/reviews", require("./routes/admin/reviewsRouterAdmin"));
//-----Admin Products endpoints
app.use(
  "/api/v1/admin/products",
  require("./routes/admin/productsRouterAdmin")
);
//
//

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
