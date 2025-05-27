const jwt =  require('jsonwebtoken'); //check token from frontend
const prisma = require('../config/prisma');
exports.authCheck = async(req,res,next)=>{
    try{
        // code 
        const headerToken = req.headers.authorization;
        if (!headerToken){
            return res.status(401).json({message:"No token authorization!!!"})
        }
        // split token (bearer token get only token)
        const token = headerToken.split(" ")[1]


        // vertify token from  user login 
        const decode = jwt.verify(token,process.env.secret_key)
        // create object key for get decode to check email or password
        req.user=decode
        const user = await prisma.user.findFirst({
            where:{
                email:req.user.email
            }
        })
        //  console.log(user)
        // check user is enabled or disbled
        if (!user.enabled){
            return res.status(400).json({message:"This account not access!!!"})
        }
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Token error!!!"})
    }
} 
exports.adminCheck = async(req,res,next)=>{
    try{
        // check from authCheck user
        const {email} = req.user
        console.log('admin check',email) 
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({message:"admin error!!!"})
    }
}