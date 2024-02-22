const {JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json("It does not start with Bearer")
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.userId){
            req.userId = decoded.userId
            next()
        }
        else{
            return res.status(403).json({msg:"Incorrect token- userId not found"})
        }
    }catch(err){
        return res.status(403).json({msg:"Incorrect token"})
    }
}

module.exports = {
    authMiddleware
}
