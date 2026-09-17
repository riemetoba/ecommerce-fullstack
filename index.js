require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require("dotenv").config()
const express = require("express")
const app = express()
const authRouter = require('./routes/authRouter')
const mongoDB = require("./config/dbConnection")


mongoDB()

app.use(express.json())


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", authRouter)
app.use("/api/v1/admin", authRouter)
app.use("/api/v1/vendor", authRouter)


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
    
})
