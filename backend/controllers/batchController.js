const Batch = require("../models/batch");
const Medicine=require("../models/medicine");

exports.createBatch = async (req, res) => {
    try {
        const {
            medicine,
            batchNumber,
            expiryDate,
            purchasePrice,
            sellingPrice,
            quantity
        } = req.body;

        const medicineExists = await Medicine.findById(medicine);
        if (!medicineExists) {
            return res.status(404).json({
                message: "Medicine not found",
            });
        }

        //create batch
        const batch = await Batch.create({
            medicine,
            batchNumber,
            expiryDate,
            purchasePrice,
            sellingPrice,
            quantity
        });
        res.status(200).json(batch);

    }
    catch (error) {
        res.status(500).json({
            message: "failed to create batch",
            error: error.message
        });
    }
};

//get all batches
exports.getMedicineBatches = async (req, res) => {
    try {
        const batches = await Batch.find()
            .populate("medicine", "name genericName")
            .sort({ expiryDate: 1 });

        res.status(200).json(batches);

    }
    catch (error) {
        res.status(500).json({
            message: "Can't fetch All Batches",
            error: error.message
        });

    }
}

exports.getMedicineBatch = async (req, res) => {
    try {
        const batches = await Batch.find({
            medicine: req.params.medicineId
        }).sort({
            expiryDate: 1
        });

        res.satus(200).json(batches);
    }
    catch (error) {
        res.satus.json(500).json({
            message: "Can't fetch this batch for this medicine"
        });
    }
}


exports.updateBatch = async (req, res) => {
    try {
        const batch = await Batch.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!batch) {
            return res.status(404).json({
                message: "Batch not found"
            });
        }


        res.status(200).json(batch);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update Batch",
            error: error.message
        });
    }
}

// Delete batch
exports.deleteBatch = async (req, res) => {
    try {

        const batch = await Batch.findByIdAndDelete(
            req.params.id
        );
        if (!batch) {
            return res.status(404).json({
                message: "Batch not found"
            });
        }
        res.status(200).json({
            message: "Batch deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete batch",
            error: error.message
        });

    }
};