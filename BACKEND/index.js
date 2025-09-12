const connectToDB = require("./db.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS configuration
app.use(cors({
  origin: "https://white-board-gamma-eight.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.options("*", cors());

app.use(express.json());

connectToDB();

const userroutes = require("./routes/userroutes.js");
const canvasroutes = require("./routes/canvasroutes.js");

app.use("/user", userroutes);
app.use("/", canvasroutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`${PORT} connected`);
});
