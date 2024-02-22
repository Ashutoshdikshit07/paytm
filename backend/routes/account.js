const express = require("express")
const { authMiddleware } = require("../middleware")
const router = express.Router()
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")





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
    
    // Starts the sessions it makes sure only one transaction takes place at a time
    try{
    const session = await mongoose.startSession()
    session.startTransaction() 
    const {amount, sendTo} = req.body
    if(amount == 0){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"Amount cant be zero"
        })
    }
    const account = await Account.findOne({
        userId:req.userId
    }).session(session)

    if(!account || account.balance<amount){
        
        await session.abortTransaction()
        return res.status(400).json({
            msg:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId:sendTo
    }).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            msg: "Invalid account"
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    }).session(session)

    await Account.updateOne({
        userId:sendTo
    },{
        $inc:{
            balance:+amount
        }
    }).session(session)
    // Commits the transaction once both the update is run successfully.
    await session.commitTransaction()
    res.json({
        msg:"Amount transfered"

    })
    }catch(e){
        await session.abortTransaction()
        return res.status(400).json({
            msg: "something went wrong"
        })
    }
})








module.exports = router
