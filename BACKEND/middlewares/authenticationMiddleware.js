const jwt = require("jsonwebtoken");

const authenticationMiddleware= async (req,res,next) =>{
   try {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({message:"Token missing"});
    }

    const token= authHeader.split(" ")[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.email= decoded.email;
    next();
   } catch (error) {
    return res.status(401).json({message: "Authentication failed"});
   }
    
}

module.exports= authenticationMiddleware;