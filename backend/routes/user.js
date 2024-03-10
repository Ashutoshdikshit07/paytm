const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const {authMiddleware} = require("../middleware")
const { User, Account } = require("../db")
const router = express.Router()
const {JWT_SECRET} = require("../config")



//Creating a zod Schema for incoming body
const signupSchema = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

// route added to /api/v1/user/signup 

router.post("/signup", async(req, res)=>{
    // Here first check if the schema is valid 
    const body = req.body
    const {success} = signupSchema.safeParse(req.body)
    
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    // Check if the user already exists. If it does stop it right there  
    const user = await User.findOne({
        username: body.username,
    })

    if(user){
        return res.status(411).json({
            message: "Email already taken"
        })
    }
    // If it is unique add the user in the database sign it with the jwt secret and with the userId.
    // and send it back to the user
    const dbUser = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    });
    
    // Creating a const variable userId storing Id 
    const userId = dbUser._id

    // It creates a entry for every new user created 
    // and assigns some random money to each user.
    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    // Signs a token for the user which can used to check if its the correct user.

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message: "User created successfuly",
        token: token
    })

})





// Creating a schema to check if the inputs are given
// correctly using zod library.

const signinSchema = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

// route added to /api/v1/user/signin 
router.post("/signin", async (req, res)=>{

    const body = req.body
    const {success} = signinSchema.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password:body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)
        return  res.status(200).json({
            message: "User created successfully",
	        token: token
        })
    }
    else{
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    
})

const updateBody = zod.object({
	firstName: zod.string().optional(),
	lastName: zod.string().optional(),
	password: zod.string().optional()
})

router.put("/",authMiddleware,async(req,res)=>{
    
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }
    console.log(req.userId)
    await User.updateOne({_id:req.userId},req.body)

    res.json({
        message:"Update successfuly"
    })
})


router.get("/bulk",authMiddleware, async (req,res)=>{
    const filter = req.query.filter || ""
    console.log("user ID: ",req.userId)
    const users = await User.find({
        _id: {$ne:req.userId },

        $or: [{
            firstName: {
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

router.get("/getUser",authMiddleware,async(req,res)=>{
    console.log("user ID: ",req.userId)
    const user = await User.findOne({
         _id: req.userId,
    })
    if(!user){
        return res.status(404).json({
        message:"Incorrect id :("
        })
    }

    res.status(200).json(user)
})


// SELECT * FROM users  WHERE name LIKE '%m%'

 module.exports = router

 