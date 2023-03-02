const passport = require("passport");
const { deleteCategory, createCategory, updateCategory } = require("../controllers/categoryControll");
const router=require('express').Router()
router.use(passport.authenticate("jwt", { session: false }))
router.delete('/:id',deleteCategory)
router.patch('/:id',updateCategory)
router.post('/',createCategory)
module.exports=router