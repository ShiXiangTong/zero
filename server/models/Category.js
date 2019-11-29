//mongoose的模型
const mongoose = require('mongoose')

//定义模型有哪些
const schema = new mongoose.Schema({
    name:{
        type:String
    }
    //暂时定义
})

// 导出
module.exports = mongoose.model('Category',schema) //创建一个模型
