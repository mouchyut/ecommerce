// import ......
const express=require('express');
const router=express.Router();
// import file controller
const { register,login,currentUser } =require('../controllers/auth');
// import middleware
const {authCheck,adminCheck} = require('../middleware/authCheck')
// Register Endpoint
router.post('/register',register)
router.post('/login',login);
router.post('/user',authCheck,currentUser);
router.post('/admin',authCheck,adminCheck,currentUser);


module.exports=router;