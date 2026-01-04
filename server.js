const express = require("express")
require("dotenv").config()
require("colors")
const cors = require('cors')
const app = express()
const db = require("./models/index")
const swaggerUi = require('swagger-ui-express'); 
const swaggerJsdoc = require('swagger-jsdoc');
const { adminRegister } = require("./controllers/admin/admin.controller")
const path = require('path')
const cookieParser = require("cookie-parser");

app.use(cookieParser());


// Middlewares
app.use(cors({
    origin: "*", // frontend domeni
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Swagger
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Minimal API",
      version: "1.0.0",
      description: "Bosh holat va minimal Swagger misoli",
    },
  },
  apis: ["./swaggerDocs/*.swagger.js", "./*.js"], // Swagger comment shu faylda bo'ladi
};

const swaggerSpec = swaggerJsdoc(options);

//Routes
app.use("/v1/api", require('./routes'))

app.get("/", (req, res) => {
    res.status(200).json({
        message: "CRM sayti"
    })
})
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((req, res)=>{
    res.json([])
})

const start = async () => {
    
    await db.sequelize.sync({force: true})

    //Admin register
    await adminRegister()


    app.listen(process.env.PORT, ()=>{
        console.log("\nServer running on: http://localhost:".inverse + String(process.env.PORT).inverse);
    })
}
start()