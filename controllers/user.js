const prisma = require("../config/prisma")

exports.getUser = async(req, res)=>{
    try{
        // code
        // const {email,password,name,picture,role,enabled,address,order,carts}= req.body
        // const users = await prisma.user.findMany({
        //     email:email,
        //     password:password,
        //     name:name,
        //     picture:picture,
        //     role:role,
        //     enabled:enabled,
        //     address:address,
        //     include:{
        //         orders:order,
        //         carts:carts
        //     }
        // })
        // console.log(users)
        res.send("Hello get user!!!")
    }catch(err){
        res.status(500).json({message:"server error"})
    }
}
exports.changeStatus = async(req,res)=>{
    try{
        // code
        res.send("Hello change status")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}
exports.changeRole = async(req,res)=>{
    try{
        // code
        res.send("Hello change Role in controller")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}
exports.createCart =async(req,res)=>{
 try{
        // code
        res.send("Hello create cart in controller")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}
exports.getCart = async(req,res)=>{
    try{
        // code
        res.send("Hello get cart in controller")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}
exports.removeCart = async(req,res)=>{
    try{
        // code
        res.send("Hello remove cart in controller")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}
exports.address = async(req,res)=>{
    try{
        // code
        res.send("Hello address in controller")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}
exports.order = async(req, res)=>{
    try{
        // code
        res.send("Hello order in controller")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}
exports.getOrder = async(req,res)=>{
    try{
        // code
        res.send("Hello get order in controller")
    }catch(err){

        res.status(500).json({message:"server error!!!"})
    }
}