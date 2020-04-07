const express = require("express");
var router = express.Router();
var Plot = require("./models/plot");
var db = require("./db");

const app = express();

router.get("/", (req, res) => {
  //TODO: uitleg gebruik API
  res.send("usage: send requests to /api/boeken");
});

router.get("/percelen", (req, res) => {
  let query = req.query.equalTo;
  if (query !== undefined) {
    Plot.find(
      {
        $or: [
          { name: { $regex: ".*" + query + ".*", $options: "i" } },
          { cropName: { $regex: ".*" + query + ".*", $options: "i" } },
        ],
      },
      (err, plots) => {
        if (err) {
          res.send(err);
        }
        res.json(plots);
      }
    );
  } else {
    Plot.find((err, plots) => {
      if (err) {
        res.send(err);
      }
      res.json(plots);
    });
  }
});

router.get("/percelen/:id", (req, res) => {
  Plot.find({ plotId: req.params.id }, (err, plot) => {
    if (err) res.send(err);

    res.json(plot);
  });
});

router.post("/percelen", (req, res) => {
  let plot = new Plot({
    plotId: req.body.plotId,
    coords: req.body.coords,
    name: req.body.name,
    area: req.body.area,
    cropGroupName: req.body.cropGroupName,
    cropName: req.body.cropName,
    comments: req.body.comments,
    geometry: req.body.geometry,
  });

  plot.save((err, plot) => {
    if (err) {
      res.send(err);
    }

    res.json(plot);
  });
});

router.delete("/percelen/:id", (req, res) => {
  Plot.remove({ plotId: req.params.id }, (err, removed) => {
    if (err) res.send(err);

    res.json(removed);
  });
});

router.put("/percelen", (req, res) => {
  Plot.find({ plotId: req.params.id }, (err, plot) => {
    plot.plotId = req.body.plotId;
    plot.coords = req.body.coords;
    plot.name = req.body.name;
    plot.area = req.body.area;
    plot.cropGroupName = req.body.cropGroupName;
    plot.cropName = req.body.cropName;
    plot.comments = req.body.comments;

    plot.save((saveErr, savePlot) => {
      if (saveErr) res.send(saveErr);

      res.send(savePlot);
    });
  });
});

module.exports = router;
