const mongoose=require('mongoose')

const mongoURL="mongodb://localhost:27017/Merchant_Interactions"
// console.log("uri iriiiiiiiiiiiiiiiiiiiiiiii",mongoURL);


const connectToDB=()=>{
    mongoose.connect(mongoURL).then(()=>{
        console.log("Connected to MONGODB");
        
    }).catch((error)=>{
       console.log("Error not connected to MONGODB",error);

    })
}

module.exports=connectToDB;