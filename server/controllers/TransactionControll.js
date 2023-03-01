const Transaction = require('../models/Transaction')

exports.getAllTransaction=async (req,res)=>{
    const demo = await Transaction.aggregate([
        {
          $match: { user_id: req.user._id },
        },
        {
          $group: {
            _id: { $month: "$date" },
            transactions: {
              $push: {
                amount: "$amount",
                description: "$description",
                date: "$date",
                category_id: "$category_id",
                _id: "$_id",
              },
            },
            totalExpenses: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    res.status(200)
    .json({status:"sucess",data:demo})
}

exports.createTransaction=async (req,res)=>{
    try {
        const {amount,description,date}=req.body
        const newTransaction=new Transaction({
           amount,
           description,
           user_id:req.user._id,
           date,
           category_id:req.body.category_id 
        })
        await newTransaction.save()
        res.status(201)
        .json({status:"sucesss"})
    } catch (error) {
        res.status(500)
        .json({status:"Error"})
    }
}

exports.deleteTransaction=async(req,res)=>{
    try {
        const {id}=req.params
        await Transaction.findByIdAndDelete(id)
        res.status(200).json({status:"sucess"})
    } catch (error) {
        res.status(500)
        .json({status:"Error"})
    }
}

exports.updateTransaction=async (req,res)=>{
    try {
        const {id}=req.params
        await Transaction.findByIdAndUpdate(id,req.body)
        res.status(200).json({status:"sucess"})
    } catch (error) {
        res.status(500)
        .json({status:"Error"})
    }
}