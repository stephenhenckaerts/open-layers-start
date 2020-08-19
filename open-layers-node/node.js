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

app.get("/search/:query", (req, res) => {
  const query = req.params.query;
  const mapUrl =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
    query +
    "&language=nl&types=geocode&components=country%3ABE&key=" +
    process.env.GOOGLE_PLACES_API;
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

app.get("/location/:placeid", (req, res) => {
  const placeid = req.params.placeid;
  const mapUrl =
    "https://maps.googleapis.com/maps/api/place/details/json?input=&placeid=" +
    placeid +
    "&key=" +
    process.env.GOOGLE_PLACES_API;
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

app.get("/geoLocation", (req, res) => {
  const mapUrl =
    "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
    process.env.GOOGLE_PLACES_API;
  request.post(
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
