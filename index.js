require("dotenv").config()
const express = require("express")
const app = express()

app.use(express.json())


app.use('/api/v1/auth')


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
    
})
