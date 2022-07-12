import Vue from 'vue'
import VueRouter from 'vue-router'
import MenuListView from '@/views/MenuListView'
import CreateMenuView from '@/views/CreateMenuView'
import CreateDish from '@/components/CreateDish'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MenuListView',
    component:MenuListView,
  },
  {
    path:'/create-menu',
    name:'CreateMenuView',
    component:CreateMenuView,
  },
  {
    path:'/create-dish',
    name:'CreateDish',
    component:CreateDish,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
