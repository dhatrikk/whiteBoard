const {getAllCanvas,createCanvas, loadCanvas,updateCanvas} = require("../controller/canvascontroller");
const authenticationMiddleware= require("../middlewares/authenticationMiddleware");
const express= require("express");
const router = express.Router();

router.get("/canvas",authenticationMiddleware,getAllCanvas);
router.post("/canvas",authenticationMiddleware,createCanvas);
router.get("/canvas/:id",authenticationMiddleware,loadCanvas);
router.put("/canvas/update/:id",authenticationMiddleware,updateCanvas);

module.exports=router;