const Supplier=require("../models/supplier");

exports.createSupplier=async(req,res)=>{
    try{
        const supplier=await Supplier.create(req.body);
        res.status(200).json(supplier);
    }
    catch(error){
        res.status(500).json({
            message: "Failed to create Supplier",
            error: error.message
        })
    }
};
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find()
      .sort({ createdAt: -1 });

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch suppliers",
      error: error.message
    });
  }
};

// Get one supplier
exports.getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch supplier",
      error: error.message
    });
  }
};

// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update supplier",
      error: error.message
    });
  }
};

// Delete supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(
      req.params.id
    );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found"
      });
    }

    res.status(200).json({
      message: "Supplier deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete supplier",
      error: error.message
    });
  }
};