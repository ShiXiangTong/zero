//mongoose的模型
const mongoose = require('mongoose')

//定义模型有哪些
const schema = new mongoose.Schema({
    
    //某父级分类 类型
    parent:{
        type:mongoose.SchemaTypes.ObjectId, //数据库中的id格式
        ref:"Category"  // 所属集合 (貌似没用一样)
    },
    
    // 某分类 类型
    name:{
        type:String
    },
})

// 导出
//每个schema会映射到mongodb中的一个collection
// model是由schema生成的模型，可以对数据库的操作
module.exports = mongoose.model('Category',schema) //创建一个模型
