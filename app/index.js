const express = require('express');
const morgan = require("morgan")
const sequelize = require('./utils/database');
const User = require("./utils/database")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE")
    next()
});
app.use(morgan('common'));
app.use('/dev', require('./routes/dev'));
app.use('/users', require('./routes/users'));

// function to creates new tables 
(async () => {
    try {
        console.log("Creating Tables....");
        await sequelize.sync(
            { force: false }
        );
            console.log("Tables Created!");
        app.listen(process.env.EXTERNAL_PORT || 5000, () => {
            console.log("Server Listening: http://localhost:5000");
        })
    } catch (error) {
        console.log("Error! Unable to build database: ", error);
    }

})() 
