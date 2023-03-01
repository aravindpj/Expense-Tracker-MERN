const User = require('../models/User')
exports.deleteCategory=async(req,res)=>{
    try {
        const categories = req.user.categories;
        const newCategories = categories.filter(
          (category) => category._id != req.params.id
        );
      
        const user = await User.updateOne(
          { _id: req.user.id },
          { $set: { categories: newCategories } }
        );
        res.json({ user });
    } catch (error) {
        res.status(500).json({status:"Error"})
    }
}