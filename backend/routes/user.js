const express = require("express")

const router = express.Router()

router.get("/ashu", (req, res)=>{
    res.send("hi from user.js")
})

 module.exports = router

 