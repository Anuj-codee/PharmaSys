const Batch = require("../models/batch")

exports.getInventory = async (req, res) => {
    try {
        const batches = await Batch.find()
            .populate(
                "medicine",
                "name genericName category manufacturer reorderLevel"
            )
            .sort({ expiryDate: 1 });

        const inventory = batches.map((batch) => {
            const today = new Date();
            const expiry = new Date(batch.expiryDate);

            const isExpired = expiry > today;

            const isLowStock = batch.quantity <=batch.medicine.reorderLevel;

            return {
                _id: batch._id,
                medicine: batch.medicine,
                batchNumber: batch.batchNumber,
                expiryDate: batch.expiryDate,
                purchasePrice: batch.purchasePrice,
                sellingPrice: batch.sellingPrice,
                quantity: batch.quantity,
                isExpired,
                isLowStock
            }
        });
        res.status(200).json(inventory);
    }
    catch (error) {
        res.status(500).json({
            message: "Can't get Inventory details",
            error: error.message
        });
    }
};