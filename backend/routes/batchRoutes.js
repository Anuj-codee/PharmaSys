const express=require("express");

const{
    createBatch,
    getMedicineBatch,
    getMedicineBatches,
    updateBatch,
    deleteBatch
}=require("../controllers/batchController");

const router=express.Router();

router.post("/",createBatch);
router.get("/",getMedicineBatches);

router.get(
  "/medicine/:medicineId",
  getMedicineBatches
);

router.put("/:id",updateBatch);
router.delete("/:id",deleteBatch);

module.exports=router;