const mongoose = require('mongoose')

const mongoDB = ()=>{
    return mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("MongoDB connected successfully");
        
    }).catch((error)=>{
        console.log("MongoDB connection error:", error);
        
    })
}

module.exports = mongoDB