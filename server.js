//let mysql = require('mysql')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

//parse request of content-type application/json
app.use(express.json());

//parse request of content-type - application /x-www-form-urlencoded
app.use(express.urlencoded({ extend: true}));

const db = require("./app/models")
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my app."});
});

require("./app/routes/tutorial.routes")(app);

//set port , listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});