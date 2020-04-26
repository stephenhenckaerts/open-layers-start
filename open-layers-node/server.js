// server.js - app voor boeken in MongoDB
var express = require("express");
var bodyParser = require("body-parser");

var routes = require("./routes");
var maps = require("./node");

var app = express();

// configuratie van body-parser
app.use(bodyParser.json());

// nodig voor de toegang vanuit onze react applicatie - CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

// koppelen van routes aan de Express applicatie
app.use("/api", routes);
app.use("/maps", maps);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
