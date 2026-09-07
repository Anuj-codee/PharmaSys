const mongoose = require("mongoose")

const purchaseItemSchema = new mongoose.Schema({
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
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

    quantity: {
        type: Number,
        required: true,
        min: 1
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
    }
});
const PurchaseSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
        trim: true
    },

    purchaseDate: {
        type: Date,
        required: true
    },
    items:{
        type: [purchaseItemSchema],
        required: true,
        validate:{
            validator: function(items){
                return items.length>0;
            },
            message: "purchase must contain at least one item",
        }
    },
    totalAmount:{
        type: Number,
        required: true,
        min: 0,
    }
},{
    timestamps: true,
});