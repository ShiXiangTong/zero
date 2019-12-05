module.exports = app => {
   const express = require("express")
   const router = express.Router()
   const Category = require('../../models/Category') //引入模型

   app.use('/admin/api', router)

   //创建分类
   router.post('/categories', async (req, res) => {
      //数据来源是客户端传递过来的数据,但是要想使用必须在外层index中加上中间件
      //模型操作数据库
      const model = await Category.create(req.body)
      res.send(model) //发回客户端、让客户端知道创建完成了(创建的是什么)
   })

   //根据ID删除分类
   router.delete('/categories/:id', async (req, res) => {
      const model = await Category.deleteMany({
         _id:req.params.id
      })
      res.send(model) //发回客户端..  {n: 1, ok: 1, deletedCount: 1 }

   })

   //修改分类
   router.put('/categories/:id', async (req, res) => {
      const model = await Category.findByIdAndUpdate(req.params.id, req.body)
      res.send(model) //发回客户端..
   })

   //查询分类
   router.get('/categories', async (req, res) => {
      // populate('属性') -> 将查询到的这个属性继续去ref的集合中查询 -> 返回object包含全部信息
      const list = await Category.find().populate('parent').limit(10)
      res.send(list) //直接返回

   })

   //根据ID查询
   router.get('/categories/:id', async (req, res) => {
      const models = await Category.findById(req.params.id)
      res.send(models) //直接返回
/* 
      回调函数原始写法
      Category.findById(id, function(err, res){ 
      if (err) { 
      console.log("Error:" + err); 
      } else { 
         console.log("Res:" + res); 
         } 
      }) 
*/
   })
}
