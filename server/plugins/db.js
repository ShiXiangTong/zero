module.exports = app => {//其实这里没传，但是要习惯
    const mongoose = require("mongoose")
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',
    {useUnifiedTopology: true,useNewUrlParser: true}
    
    )
}