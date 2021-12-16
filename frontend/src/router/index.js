import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import NewPost from '../components/NewPost.vue'


Vue.use(VueRouter)
//Vue.use(require('vue-moment'));

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/posts',
    name: 'NewPost',
    component: NewPost,
  }
]

const router = new VueRouter({
  mode: 'history',
  /*base: process.env.BASE_URL,*/
  routes
})

export default router
