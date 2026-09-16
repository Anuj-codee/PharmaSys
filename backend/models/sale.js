const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    sellingPrice: {
        type: Number,
        required: true,
        min: 0
    },

    total: {
        type: Number,
        required: true,
        min: 0
    }
});

const saleSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        customerName: {
            type: String,
            trim: true
        },

        customerPhone: {
            type: String,
            trim: true
        },

        saleDate: {
            type: Date,
            default: Date.now
        },

        items: {
            type: [saleItemSchema],
            required: true
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Sale", saleSchema);