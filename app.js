require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;  
const app = express();

//Config Json and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Solve Cors
app.use(cors());

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//DB Connection
require("./config/db.js")

//Routes
const router = require("./routes/router.js");
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})