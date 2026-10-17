
const mongoose = require("mongoose");

const ipoSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    symbol: String,
    board: {
      type: String,
      enum: ["mainboard", "sme"],
      required: true,
    },
    stage: String,
    offerType: String,
    openDate: String,
    closeDate: String,
    listingDate: String,
    priceBand: String,
    issuePrice: Number,
    issueSize: Number,
    sourceUpdatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("IPO", ipoSchema);
