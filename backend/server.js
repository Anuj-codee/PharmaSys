const express = require("express");
const cors = require ("cors");
require("dotenv").config();



const app=express();
const connectDB=require("./config/db");

const medicineRoutes=require("./routes/medicineRoutes");
const batchRoutes=require("./routes/batchRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

app.use(express.json());
app.use(cors());

connectDB();

app.get("/",(req,res)=>{
    res.json({
        message: "Pharmacy Management API is running"
    });
});

app.use("/api/medicines",medicineRoutes)
app.use("/api/batches",batchRoutes)
app.use("/api/suppliers",supplierRoutes);


const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);

});