const express = require("express")

const userRouter = require("./user")
const accountRouter = require("./account")

const router = express.Router()


router.use("/user",userRouter)
router.use("/account",accountRouter)


router.get("/index1", (req, res)=>{
    res.send("heelo from /api/v1/user")

})
module.exports = router





















// router.get("/signup", function(req,res){
//     res.send("working")
// })

// router.get("/login", function(req,res){
//     res.send("working /login")
// })

// router.get("/update", function(req,res){
//     res.send("working /update")
// })