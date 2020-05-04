const express = require("express");
const request = require("request");

const app = express();

app.get("/map/*", (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  var mapUrl = fullUrl.substring(31, fullUrl.length);
  request(
    {
      url: mapUrl,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(error);
        return res.status(500).json({ type: "error", message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.get("/json/*", (req, res) => {
  var fs = require("fs");
  res.json(JSON.parse(fs.readFileSync("public/Wimmertingen.geojson")));
});

module.exports = app;
