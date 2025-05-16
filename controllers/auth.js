

exports.register=async(req,res)=>{
    // code
    try{
        res.send("Hello Register in controller")
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server error"})
    }
}
exports.login=async(req,res)=>{
    try{
        res.send("Hello Login in controller")
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Server error"})
    }
}
 
exports.currentUser=async(req,res)=>{
    try{
        res.send('user in controller')

    }catch(err){
        res.status(400).json({message:"User error"})
    }
}
