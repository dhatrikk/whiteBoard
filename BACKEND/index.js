const connectToDB = require("./db.js");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


const allowedOrigins = [
  "http://localhost:3000",                     
  process.env.FRONTEND_URL,
    "https://white-board-two-theta.vercel.app"
                   
];


app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

connectToDB();

const userroutes= require("./routes/userroutes.js");
const canvasroutes = require("./routes/canvasroutes.js");


app.use("/user",userroutes);
app.use("/",canvasroutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT,()=>{
console.log(`${PORT} connected`);
});

