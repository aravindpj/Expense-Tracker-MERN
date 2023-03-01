const User = require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const categories=[
    {label:"Travel",icon:"user"},
    {label:"Investment",icon:"user"},
    {label:"Shoping",icon:"user"},
    {label:"Bills",icon:"user"}
  ]

exports.register=async (req,res)=>{
    try {
    // get data
    const {firstName,lastName,email,password}=req.body 
    // check if user account already exist
    const userExist= await User.findOne({email})
    if(userExist){
        return res.status(406).json({status:"Fail",message:"The user account is already created ! "})
    }
    // encrypt password 
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password,salt)
    // save to the data base
    const newUser=new User({
        firstName,
        lastName,
        email,
        password:hashPassword,
        categories
    })
    await newUser.save()
    // send success response
    res.status(201).json({status:"success",message:"your new user account created"})
    } catch (error) {
        res.status(500)
        .json({status:"Error"})
    }
}

exports.login=async (req,res)=>{
    
    try {
        const {email,password}=req.body

        // check user exist or not
        const user=await User.findOne({email}).select('+password')
        if(!user){
            return res.status(404).json({status:"Fail",message:"User not found this email address"})
        }
        // check password is correct 
        const match=await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(406).json({status:"Fail",message:"Incorrect password"})
        }
        //sign jwt token 
        const payload={
            username:user.email,
            _id:user._id
        }
        const token=jwt.sign(payload,'json-web-token.')
        //send response
        res.status(200).json({status:"success",message:"successfully logind",token,user:{user}})

    } catch (error) {
        res.status(500)
        .json({status:"Error"})
    }
}
