const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collectionsSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ph_number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionsSchema);
