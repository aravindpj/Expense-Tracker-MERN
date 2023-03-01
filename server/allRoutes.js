const router=require('express').Router()
const TransactionApi = require("./routers/TransactionApi");
const AuthApi = require("./routers/AuthApi");
const UserApi = require("./routers/UserApi");
const CategoryApi = require("./routers/CategoryApi");
router.use("/transaction",TransactionApi);
router.use("/auth", AuthApi);
router.use('/user',UserApi)
router.use('/categories',CategoryApi)
module.exports=router