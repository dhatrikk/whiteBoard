const {getAllCanvas,createCanvas, loadCanvas,updateCanvas, deleteCanvas, shareCanvas} = require("../controller/canvascontroller");
const authenticationMiddleware= require("../middlewares/authenticationMiddleware");
const express= require("express");
const router = express.Router();

router.get("/",authenticationMiddleware,getAllCanvas);
router.post("/",authenticationMiddleware,createCanvas);
router.get("/:id",authenticationMiddleware,loadCanvas);
router.put("/update/:id",authenticationMiddleware,updateCanvas);
router.delete("/delete/:id",authenticationMiddleware,deleteCanvas);
router.put("/shareCanvas/:id",authenticationMiddleware,shareCanvas);

module.exports=router;