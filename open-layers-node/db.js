var mongoose = require("mongoose");
var db = mongoose.connect(
  "mongodb://localhost/eindwerk",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function () {
    console.log("Mongoose connected");
  }
);
module.exports = db;
