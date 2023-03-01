const passport = require("passport");
const { deleteCategory } = require("../controllers/categoryControll");
const router=require('express').Router()
router.use(passport.authenticate("jwt", { session: false }))
router.delete('/:id',deleteCategory)
module.exports=router