const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    seznamTagu: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tag", tagSchema);
