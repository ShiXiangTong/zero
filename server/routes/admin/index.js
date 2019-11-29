module.exports = app =>{
    const express = require("express")
    const router = express.Router()
    const Category = require('../../models/Category') //引入模型

    app.use('/admin/api',router)

    router.post('/categories',async(req,res)=>{
        //创建数据,数据来源是客户端传递过来的数据,但是要想使用必须在外层index中加上中间件
       const model = await Category.create(req.body)
       res.send(model) //发回客户端、让客户端知道创建完成了(创建的是什么)

    })

    router.put('/categories/:id',async(req,res)=>{
        //修改数据,注意接收两个参数
       const model = await Category.findByIdAndUpdate(req.params.id,req.body)
       res.send(model) //发回客户端..
    })

    router.get('/categories',async(req,res)=>{
       //get请求查询集合
       const list = await Category.find().limit(10) //牛,限制查询条数！
       res.send(list) //直接返回

    })

    router.get('/categories/:id',async(req,res)=>{
        //get请求查询集合
        const models = await Category.findById(req.params.id)
        res.send(models) //直接返回
  
     })
}
