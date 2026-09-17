require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require("dotenv").config()
const express = require("express")
const app = express()
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const vendorRouter = require('./routes/vendorRouter')
const mongoDB = require("./config/dbConnection")
const { adminMiddleware } = require('./middleware/roleMiddleware')


mongoDB()

app.use(express.json())


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin",adminMiddleware, adminRouter)
app.use("/api/v1/vendor", vendorRouter)


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
    
})
