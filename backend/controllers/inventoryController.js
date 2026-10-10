const Batch = require("../models/batch")
const Medicine = require("../models/medicine")

exports.getInventory = async (req, res) => {
    try {
        const [batches, medicines] = await Promise.all([
            Batch.find()
            .populate(
                "medicine",
                "name genericName category manufacturer reorderLevel"
            )
            .sort({ expiryDate: 1 }),
            Medicine.find().select("reorderLevel")
        ]);

        // Reorder levels apply to a medicine's total stock, not each batch
        // independently. Sum batches first so multiple small batches do not
        // incorrectly trigger a low-stock alert.
        const stockByMedicine = new Map();
        for (const batch of batches) {
            const medicineId = batch.medicine?._id?.toString();
            if (medicineId) {
                stockByMedicine.set(
                    medicineId,
                    (stockByMedicine.get(medicineId) || 0) + batch.quantity
                );
            }
        }

        const lowStockMedicines = medicines.filter((medicine) => {
            const totalQuantity = stockByMedicine.get(medicine._id.toString()) || 0;
            return totalQuantity <= (medicine.reorderLevel ?? 10);
        }).length;

        const inventory = batches.map((batch) => {
            const medicineId = batch.medicine?._id?.toString();
            const totalQuantity = stockByMedicine.get(medicineId) || 0;
            const reorderLevel = batch.medicine?.reorderLevel ?? 10;
            const isExpired = new Date(batch.expiryDate) < new Date();

            const isLowStock = totalQuantity <= reorderLevel;

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
        res.status(200).json({
            inventory,
            summary: { lowStockMedicines }
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Can't get Inventory details",
            error: error.message
        });
    }
};

exports.getMedicineStock= async(req,res)=>{
    try{
        const batches = await Batch.find({
            medicine: req.params.medicineId
        });
        const totalQuantity=batches.reduce(
            (total,batch)=>total+batch.quantity,
            0
        );
        res.status(200).json({
            medicine: req.params.medicineId,
            totalQuantity,
            batches
        });
    }
    catch(error){
        return res.status(500).json({
            message: "Failed to calculate stock",
            error: error.message
        })
    }
}
