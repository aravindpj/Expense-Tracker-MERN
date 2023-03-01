const mongoose=require('mongoose')
const transactionSchema=new mongoose.Schema({
    amount:Number,
    description:String,
    user_id:mongoose.Types.ObjectId,
    date:{
        type:Date,
        default:new Date()
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    category_id:mongoose.Types.ObjectId
})



const Transaction=mongoose.model('Transaction',transactionSchema)
module.exports=Transaction