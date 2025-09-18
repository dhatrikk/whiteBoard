const connectToDB = require("./db.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


const allowedOrigins = [
  "http://localhost:3000",                     
    "https://canvaswhiteboard.vercel.app",
                   
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

connectToDB();

const userroutes= require("./routes/userroutes.js");
const canvasroutes = require("./routes/canvasroutes.js");


app.use("/user",userroutes);
app.use("/canvas",canvasroutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT,()=>{
console.log(`${PORT} connected`);
});

