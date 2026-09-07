const mongoose = require("mongoose")

const batchSchema = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true
    },
    batchNumber: {
        type: String,
        required: true,
        trim: true
    },

    expiryDate: {
        type: Date,
        required: true
    },

    purchasePrice: {
        type: Number,
        required: true,
        min: 0
    },

    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    },

    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
},
    {
        timestamps: true
    }
);

module.exports=mongoose.model("Batch",batchSchema);