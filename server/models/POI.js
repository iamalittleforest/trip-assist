const { Schema } = require("mongoose");

const POISchema = new Schema({
  POI_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  business_status: {
    type: String,
  },
  rating: {
    type: Number,
  },
  types: {
    type: [String],
  }
});

module.exports = POISchema;
