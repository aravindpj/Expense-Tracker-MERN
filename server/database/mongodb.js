const mongoose=require('mongoose')
module.exports=async function connect(){
    mongoose.connect(process.env.DB)
    .then(()=>console.log('Database Connected'))
    .catch((err)=>console.log(err.message))
}
