const express = require('express')
const router = express.Router()
// import middleware
const {authCheck, adminCheck} = require('../middleware/authCheck')
// import controller
const { getUser,changeStatus,changeRole,createCart,getCart,removeCart,address,order,getOrder} = require('../controllers/user')

router.get('/get-user',authCheck,adminCheck,getUser)
router.post('/users',changeStatus)
router.post('/user-role',changeRole)
router.post('/create-cart',createCart)
router.get('/get-cart',getCart)
router.delete('/remove-cart',removeCart)
router.get('/address',address)
router.post('/order',order)
router.get('/get-order',getOrder)
module.exports = router
