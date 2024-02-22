const express = require("express")
const { authMiddleware } = require("../middleware")
const router = express.Router()
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const { Account } = require("../db")





router.get("/balance",authMiddleware,async (req,res)=>{

    // Find the account presnt in the database using the userId
    // (which is fetched using middleware to verify the jwt token)
    const account =await Account.findOne({
        userId: req.userId,
    })

    // If the data is not found return error
    if(!account){
       return res.status(400).send({
        msg: "not found"
    }) 
    }
    // display the amount. 
    res.status(200).send({
        msg: "got the balance",
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async(req,res)=>{
    const {amount, sendTo} = req.body

    const account = await Account.findOne({
        userId:req.userId
    })
    if(account.balance<amount){
        return res.status(400).send({
            msg:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId:sendTo
    })
    if(!toAccount){
        return res.status(400).send({
            msg: "Invalid account"
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    })

    await Account.updateOne({
        userId:sendTo
    },{
        $inc:{
            balance:+amount
        }
    })
    res.json({
        msg:"Amount transfered"
        
    })
    
})








module.exports = router
