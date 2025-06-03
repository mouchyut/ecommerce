const express = require('express')
const router = express.Router()
// import middleware
const {authCheck, adminCheck} = require('../middleware/authCheck')
// import controller
const { getUser,changeStatus,changeRole,createCart,getCart,removeCart,address,SaveOrder,getOrder} = require('../controllers/user')

router.get('/get-user',authCheck,adminCheck,getUser)
router.post('/users',authCheck,adminCheck,changeStatus)
router.post('/user-role',authCheck,adminCheck,changeRole)
router.post('/create-cart',authCheck,createCart)
router.get('/get-cart',authCheck,getCart)
router.delete('/remove-cart',authCheck,removeCart)
router.get('/address',authCheck,address)
router.post('/order',authCheck,SaveOrder)
router.get('/get-order',authCheck,getOrder)
module.exports = router
