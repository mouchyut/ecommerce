const { param } = require("../routes/auth");

exports.create=async(req,res)=>{
    try{
        res.send("Category Create");
    }catch(err){
        res.status(400).json({message:"create error"})
    }
}
exports.add=async(req,res)=>{
    try{
        res.send("Category add");
    }catch(err){
        res.status(400).json({message:"create error"})
    }
}
exports.remove=async(req,res)=>{
    try{
        const {id}=req.params
        console.log(id)
        res.send("Category remove");
    }catch(err){
        res.status(500).json({message:"create error"})
    }
}