const connectToDB = require("./db.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

connectToDB();

const userroutes= require("./routes/userroutes.js");
const canvasroutes = require("./routes/canvasroutes.js");


app.use("/user",userroutes);
app.use("/",canvasroutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
console.log(`${PORT} connected`);
});

