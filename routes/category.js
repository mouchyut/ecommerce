const express = require("express");
const router=express.Router();
const {create,add,remove}=require('../controllers/category')


// Endpoint Category
router.post('/category',create)
router.get('/category',add)
router.delete('/category/:id',remove)


module.exports=router;