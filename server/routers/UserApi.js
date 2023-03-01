
const passport=require('passport')
const { getUser } = require('../controllers/userControll')
const router=require('express').Router()

router.use(passport.authenticate("jwt", { session: false }))

router.get('/',getUser)

module.exports=router