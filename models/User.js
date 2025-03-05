const mongoose=require('mongoose')

const Users=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const UserData=new mongoose.model("UserData",Users)

module.exports=UserData;

