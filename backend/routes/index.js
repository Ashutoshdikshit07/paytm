const express = require("express")

const router = express.Router();

module.exports = router


router.get("/signup", function(req,res){
    res.send("working")
})

router.get("/login", function(req,res){
    res.send("working /login")
})

router.get("/update", function(req,res){
    res.send("working /update")
})
