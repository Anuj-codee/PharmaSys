const Purchase = require("../models/purchase");
const Supplier = require("../models/supplier");
const Medicine = require("../models/medicine");
const Batch = require("../models/batch");

exports.createPurchase = async (req, res) => {
    try {
        const {
            supplier,
            invoiceNumber,
            purchaseDate,
            items
        } = req.body;

        const supplierExists = await Supplier.findById(supplier);

        if (!supplierExists) {
            return res.status(400).json({
                message: "Supplier not found",
            });
        }

        //check all medicines
        for (const item of items) {
            const medicineExists = await Medicine.findById(item.medicine);

            if (!medicineExists) {
                return res.status(400).json({
                    message: `Medicine not found: ${item.Medicine}`
                });
            }
        }
        //calculate total
        const totalAmount = items.reduce(
            (total, item) => {
                return total + (item.quantity * item.purchasePrice);
            }, 0
        );

        //create Purchase
        const purchase = await Purchase.create({
            supplier,
            invoiceNumber,
            purchaseDate,
            items,
            totalAmount,
        });


        // Update Inventory
        for (const item of items) {

            const existingBatch = await Batch.findOne({
                medicine: item.medicine,
                batchNumber: item.batchNumber
            });

            if (existingBatch) {

                existingBatch.quantity += item.quantity;

                await existingBatch.save();

            } else {

                await Batch.create({
                    medicine: item.medicine,
                    batchNumber: item.batchNumber,
                    expiryDate: item.expiryDate,
                    purchasePrice: item.purchasePrice,
                    sellingPrice: item.sellingPrice,
                    quantity: item.quantity
                });

            }
        }

        res.status(201).json(purchase);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create Purchase",
            error: error.message
        });
    }
};

exports.getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate("supplier", "name phone")
            .populate("items.medicine", "name genericName")
            .sort({ purchaseDate: -1 });

        res.status(200).json(purchases);

    }
    catch (error) {
        res.status(500).json({
            messgae: "Failed to fetch ALL medicines",
            errror: error.message
        });
    }
};

// Get one purchase
exports.getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate("supplier", "name phone")
      .populate(
        "items.medicine",
        "name genericName"
      );

    if (!purchase) {
      return res.status(404).json({
        message: "Purchase not found"
      });
    }

    res.status(200).json(purchase);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch purchase",
      error: error.message
    });
  }
};


