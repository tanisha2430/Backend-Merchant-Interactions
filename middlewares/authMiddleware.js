const jwt=require('jsonwebtoken')
const UserData = require('../models/User.js')

const fetchUsers=async(req,res,next)=>{
    const token=req.header("auth-token")
    if(!token){
    return res.status(401).json("Please provide token")
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log("decode",decode);
        if(!decode || !decode.tokenuser || !decode.tokenuser._id){
            return res.status(400).json("Unauthorized")
        }
        const user = await UserData.findById(decode.tokenuser._id)
        req.user=user;
        next()
    } catch (error) {
        console.log("Error",error);
        res.status(500).json("Error in catch of middleware")
    }
}

module.exports=fetchUsers;