const express = require("express")

const app = express()
app.use(require('cors')()) //开启跨域
app.use(express.json())    //开启转换数据

require('./routes/admin/index')(app) //执行后台界面的总控制
require('./plugins/db')(app) //执行 开启数据库


app.listen(3000,()=>{ //开启服务器
    console.log('http://localhost:3000');  
})
