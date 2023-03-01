const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{type:String,required:["please provide email address"]},
    password:{type:String,required:['create your passoword'],select:false},
    categories:[
        {label:String,icon:String},
      ]
})
const User=mongoose.model('User',userSchema)
module.exports=User