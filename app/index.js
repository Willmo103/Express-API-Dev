// Imports
const express = require("express");
const morgan = require("morgan");
const sequelize = require("./utils/database");

//----Initialize App
const app = express();

//----Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  next();
});

//-----API
//
//-----PUBLIC ROUTES
//
//-----Dev version
app.use("/dev", require("./routes/devRouter"));
//-----Login
app.use("/login", require("./routes/loginRouter"));
//-----Users
app.use("/users", require("./routes/usersRouter"));
//-----Products
app.use("/products", require("./routes/productsRouter"));
//-----Saved
app.use("/saved", require("./routes/savedRouter"));
//
//-----RESTRICTED ROUTES
//
//-----ADMIN User endpoints
app.use("/admin/users", require("./routes/admin/usersRouterAdmin"));
//-----ADMIN Reviews endpoints
app.use("/admin/reviews", require("./routes/admin/reviewsRouterAdmin"));
//-----Admin Products endpoints
app.use("/admin/products", require("./routes/admin/productsRouterAdmin"));
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
