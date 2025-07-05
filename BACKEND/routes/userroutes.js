const {  registerUser, getUser, loginUser} = require("../controller/usercontroller");
const express = require("express");
const router = express.Router();

router.get("/userProfile",getUser);
router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports= router;
