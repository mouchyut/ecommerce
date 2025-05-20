const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {

  // step 1 validate body
  try {
    const { email, password } = req.body;
    // console.log(email,password)
    if (!email) {
      res.status(400).json({ message: "email is requries!!!" });
    }
    if (!password) {
      res.status(400).json({ message: "password is requries!!!" });
    }
    // res.send("Hello Register in controller");

    // step 2 check email in DB already

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user){
        return res.status(400).json({message:"email already exit!!!"})
    }
    // step 3 hash password

    const hashPassword=await bcrypt.hash(password,10)
    // console.log(hashPassword)
    // step 4 Register
    await prisma.user.create({
        data:{
            email:email,
            password:hashPassword
        }
    })
    // console.log(user);
    res.status(400).json({message:"Register Successfully!!!"})
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const {email,password}=req.body

    // step 1 check email
    const user=await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if (!user || !user.enabled){
        return res.status(400).json({message:"User Not Enabled"})
    }
    // step 2 check password
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Password is Invalid!!!!"})
    }
    // step 3 create payload(To Send Data Between Client and Server)
    const payload={
        id:user.id,
        email:user.email,
        role:user.role
    }

    // step 4 generate token
        jwt.sign(payload,process.env.secret_key,{expiresIn:'1d'},
            (err,token)=>{
                if(err){
                    return res.status(500).json({message:"Server Error"})
                }
                res.json({payload,token})
        })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    res.send("user in controller");
  } catch (err) {
    res.status(400).json({ message: "User error" });
  }
};
