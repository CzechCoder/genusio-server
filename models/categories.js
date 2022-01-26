const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    

    seznamKategorii:{
        type: Array,
        required: false,
    }


}, {
    timestamps: true,
}
);

module.exports = mongoose.model("Category", catSchema);