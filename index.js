require('node:dns').setServers(['1.1.1.1','8.8.8.8'])
require("dotenv").config()
const express = require("express")
const app = express()
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const mongoDB = require("./config/dbConnection")
const { adminMiddleware, userMiddleware } = require('./middleware/roleMiddleware')

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

mongoDB()

app.use(express.json())

const port = process.env.PORT || 5000;

// --- Swagger Setup Start ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API Documentation',
      version: '1.0.0',
      description: 'API documentation for my E-commerce backend project',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// --- Swagger Setup End ---


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user",userMiddleware, userRouter)
app.use("/api/v1/admin",adminMiddleware, adminRouter)


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
    console.log(`Swagger Docs is available at: http://localhost:${port}/api-docs`); 
})