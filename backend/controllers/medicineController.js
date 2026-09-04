const Medicine = require("../models/medicine");

exports.createMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.create(req.body);
        res.status(201).json(medicine);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: Object.values(error.errors).map((err) => err.message),
            });
        }

        res.status(500).json({
            message: "Failed to create medicine",
            error: error.message,
        });
    }
};

exports.getAllMedicines = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { genericName: { $regex: search, $options: "i" } },
            ];
        }

        if (category) {
            filter.category = category;
        }

        const skip = (Number(page) - 1) * Number(limit);
        const medicines = await Medicine.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Medicine.countDocuments(filter);
        res.status(200).json({
            medicines,
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            totalMedicines: total,
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to get all medicines",
            error: error.message,
        });
    }
};

exports.getMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            return res.status(404).json({
                message: "Cannot find medicine",
            });
        }

        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch medicine",
            error: error.message,
        });
    }
};

exports.updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found",
            });
        }

        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update medicine",
            error: error.message,
        });
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            return res.status(404).json({
                message: "No such medicine exists",
            });
        }

        res.status(200).json({
            message: "Medicine deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete medicine",
            error: error.message,
        });
    }
};