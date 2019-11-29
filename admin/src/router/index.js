import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        //新建
        path:'/categories/create',
        component:CategoryEdit
      },
      {
        //查询
        path:'/categories/list',
        component:CategoryList
      },
      {
        //编辑与新建的组件是一个，但是路径不一样。
        path:'/categories/edit/:id',
        component:CategoryEdit,
        props:true
      }
    ]
  }
]

const router = new VueRouter({
  routes,
})

export default router
