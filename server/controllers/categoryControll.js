const User = require("../models/User");
exports.deleteCategory = async (req, res) => {
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
    res.status(500).json({ status: "Error" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    // const {label,icon}=req.body
     const createdOne=await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { categories: { ...req.body } } },
      {new:true}
    );
    res.status(200).json({ status: "success",data:createdOne});
  } catch (error) {
    res.status(500).json({ status: "Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id=req.params.id
   const {categories} = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: { categories: req.user.categories.map(cat=>cat.id === id ? {...req.body} : cat) }},
      {new:true}
    );
    res.status(200).json({status:"success",data:{categories}})
  } catch (error) {
    res.status(500).json({ status: "Error" });
  }
};
