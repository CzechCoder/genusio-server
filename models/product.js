const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    communityname:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    },
    
    uniqueValue:{
        type: String,
        // required: true,
    },

    image: {
        type: String,
        image: String,
        default: "http://tomasburian.com/komunita_tmp.jpg",
    },

    foundingDate:{
        type: String,
        // required: true,
    },

    membersCount:{
        type: String,
        // required: true,
    },

    commCategoriess:{
        type: Array,
    },

    growthToolss:{
        type: Array,
        // required: true,
    },
    otherTools:{
        type: String,
        // required: true,
    },

    membershipPayment:{
        type: Array,
        // required: true,
    },

    regIntentionn:{
        type: Number,
        // required: true,
    },

    commApproved:{
        type: Boolean,
        required: false,
        default: false,
    },


}, {
    timestamps: true,
}
);

module.exports = mongoose.model("Product", productSchema);