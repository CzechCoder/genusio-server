const mongoose = require("mongoose");

const commSchema = new mongoose.Schema(
  {
    communityname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    uniqueValue: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      image: String,
      default: "http://tomasburian.com/komunita_tmp.jpg",
    },

    foundingDate: {
      type: String,
      required: true,
    },

    membersCount: {
      type: Number,
      required: true,
    },

    commCategoriess: {
      type: Array,
    },

    commSubtags: {
      type: Array,
      required: false,
    },

    growthToolss: {
      type: Array,
      required: true,
    },
    otherTools: {
      type: String,
      required: false,
    },

    membershipPayment: {
      type: Array,
      required: true,
    },

    regIntentionn: {
      type: Number,
      required: true,
    },

    commApproved: {
      type: Boolean,
      required: false,
      default: false,
    },

    katApproved: {
      type: Boolean,
      required: false,
      default: false,
    },

    marketApproved: {
      type: Boolean,
      required: false,
      default: false,
    },

    commCreator: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Community", commSchema);
