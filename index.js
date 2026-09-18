require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require("dotenv").config()
const express = require("express")
const app = express()
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const mongoDB = require("./config/dbConnection")
const { adminMiddleware, vendorMiddleware, userMiddleware } = require('./middleware/roleMiddleware')


mongoDB()

app.use(express.json())


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user",userMiddleware, userRouter)
app.use("/api/v1/admin",adminMiddleware, adminRouter)


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
    
})
