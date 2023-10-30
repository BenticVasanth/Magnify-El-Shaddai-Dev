const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();
app.options('*', cors())

var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// set port, listen for requests
const PORT = 8081;
app.listen(PORT, () => {
  app.get("/login/getServerStatus", (req, res) => {
    res.json("Server Up");
    require("./app/routes/login.routes.js")(app);
  });
});
