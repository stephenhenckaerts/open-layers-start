var mongoose = require("mongoose");

const plotSchema = mongoose.Schema(
  {
    area: { type: String, required: true },
    comments: { type: String, required: false },
    cropGroupName: { type: String, required: true },
    cropName: { type: String, required: true },
    name: { type: String, required: true },
    plotId: { type: Number, required: true },
    coords: { type: [], required: true },
  },
  { collection: "percelen" }
);

var Plot = mongoose.model("Plot", plotSchema);

module.exports = Plot;
