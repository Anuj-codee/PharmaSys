const express=require("express");

const{
    createPurchase,
    getPurchase,
    getPurchases,
}=require("../controllers/purchaseController");


const router=express.Router();

router.post("/",createPurchase);
router.get("/",getPurchases);
router.get("/:id",getPurchase);

module.exports=router;