import login from '@/components/login';
import item from '../components/item.vue';
import user from '../components/user.vue';
import dime from '../components/dime.vue';
import home from '../components/home.vue';
import test from '../components/test.vue';
import cart from '../components/cart.vue';
import page404 from '../components/404.vue';
import VueRouter from 'vue-router'
const router = new VueRouter({
  mode : 'history',
  routes
})
export const routes =[
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path:'/login',
    name : 'login',
    component: login
  },
  {
    path:'/user',
    name:'user',
    component : user,
    beforeEnter (to, from, next) {
      if(localStorage.usertoken){
        next();
      }else{
        next('/login')
      }
    }
  },
  {
    path : '/dime',
    name : 'dime',
    component: dime
  },
  {
    path : '/item/:id',
    name : 'viewitem',
    component : item
  },
  {
    path : '/cart',
    name : 'cart',
    component : cart
  },
  {
    path: '/test',
    name : 'test',
    component : test
  },
  {
    path: '*',
    component : page404
  }
]
