const connectToDB = require("./db.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://white-board-two-theta.vercel.app",  // deployed frontend
  process.env.FRONTEND_URL                     // optional .env config
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Debug log for incoming requests
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url, "Origin:", req.headers.origin);
  next();
});

// ✅ Connect DB
connectToDB();

// ✅ Routes
const userroutes = require("./routes/userroutes.js");
const canvasroutes = require("./routes/canvasroutes.js");

app.use("/user", userroutes);
app.use("/", canvasroutes);

// ✅ Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`${PORT} connected`);
});
