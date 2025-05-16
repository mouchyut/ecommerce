// import ......
const express=require('express');
const router=express.Router();
// import file controller
const { register,login,currentUser } =require('../controllers/auth');

// Register Endpoint
router.post('/register',register)
router.post('/login',login);
router.post('/user',currentUser);
router.post('/admin',currentUser);


module.exports=router;