const express = require("express");
var router = express.Router();
var Plot = require("./models/plot");
var db = require("./db");
var multer = require("multer");

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
    shapefile: [],
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
  Plot.findOne({ plotId: req.body.plotId }, (err, plot) => {
    plot.coords = req.body.coords;
    plot.name = req.body.name;
    plot.area = req.body.area;
    plot.cropGroupName = req.body.cropGroupName;
    plot.cropName = req.body.cropName;
    plot.comments = req.body.comments;
    plot.geometry = req.body.geometry;

    plot.save((saveErr, savePlot) => {
      if (saveErr) res.send(saveErr);
      res.json(savePlot);
    });
  });
});

router.post("/uploadShapefile/:id&:type", (req, res) => {
  let filename = "";
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
      filename = file.originalname;
    },
  });

  var upload = multer({ storage: storage }).single("file");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    Plot.findOne({ plotId: req.params.id }, (err, plot) => {
      plot.shapefile.push({ file: filename, type: req.params.type });

      plot.save((saveErr, savePlot) => {
        if (saveErr) res.send(saveErr);
        return res.status(200).send(req.file);
      });
    });
  });
});

router.get("/getShapefile/:shapefileName", (req, res) => {
  var fs = require("fs");
  res.json(JSON.parse(fs.readFileSync("public/" + req.params.shapefileName)));
});

router.get("/getBodemscan", (req, res) => {
  var fs = require("fs");
  res.json(JSON.parse(fs.readFileSync("public/bodemscans/bodemscan.geojson")));
});

module.exports = router;
