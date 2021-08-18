const { Schema } = require('mongoose');

const POISchema = new Schema({
  placeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  img:{
    type: String,
  },
  business_status: {
    type: String,
  },
  rating: {
    type: Number,
  },
  vicinity: {
    type: String,
  },
});

module.exports = POISchema;
