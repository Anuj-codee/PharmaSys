const express = require("express");

const {
    createMedicine,
    getAllMedicines,
    getMedicine,
    deleteMedicine,
    updateMedicine,
} = require("../controllers/medicineController");

const router = express.Router();

router.post("/", createMedicine);
router.get("/", getAllMedicines);
router.get("/:id", getMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

module.exports = router;