const express = require("express");
const router=express.Router();

// Endpoint Category
router.get('/category',(req,res)=>{
    res.send("Hello Category")
})


module.exports=router;