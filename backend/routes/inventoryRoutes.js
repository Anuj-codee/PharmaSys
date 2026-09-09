const express=require("express")

const {
    getInventory,
    getMedicineStock
}=require("../controllers/inventoryController");

const router=express.Router();

router.get("/",getInventory);
router.get("/medicine/:medicineId",getInventory);

module.exports=router;