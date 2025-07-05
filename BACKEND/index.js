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

app.listen(3030,()=>{
console.log("3030 connected");
});

