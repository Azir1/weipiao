const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/data',{useNewUrlParser: true,useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',console.error.bind(console,'数据库链接失败'))
db.once('open',()=>{console.log('数据库链接成功')})
const dataSchema = new mongoose.Schema({

})
const ColMsg = mongoose.model('datas',dataSchema)
module.exports = ColMsg