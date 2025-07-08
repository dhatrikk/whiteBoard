const {getAllCanvas,createCanvas, loadCanvas,updateCanvas, deleteCanvas, shareCanvas} = require("../controller/canvascontroller");
const authenticationMiddleware= require("../middlewares/authenticationMiddleware");
const express= require("express");
const router = express.Router();

router.get("/canvas",authenticationMiddleware,getAllCanvas);
router.post("/canvas",authenticationMiddleware,createCanvas);
router.get("/canvas/:id",authenticationMiddleware,loadCanvas);
router.put("/canvas/update/:id",authenticationMiddleware,updateCanvas);
router.delete("/canvas/delete/:id",authenticationMiddleware,deleteCanvas);
router.put("/canvas/shareCanvas/:id",authenticationMiddleware,shareCanvas);

module.exports=router;