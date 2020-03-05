const express = require("express");
const request = require("request");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/map/*", (req, res) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  var mapUrl = fullUrl.substring(26, fullUrl.length);
  request(
    {
      url: mapUrl
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      console;

      res.json(JSON.parse(body));
    }
  );
});

app.get("/json/*", (req, res) => {
  var fs = require("fs");
  res.json(JSON.parse(fs.readFileSync("Wimmertingen.geojson")));
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
