import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Profile from '../views/Profile.vue'

import Signup from '../components/Users/Signup.vue'
import Login from '../components/Users/Login.vue'
import ModifyUser from '../components/Users/ModifyUser.vue'

import Posts from '../components/Posts/Posts.vue'
import NewPost from '../components/Posts/NewPost.vue'
import ModifyPost from '../components/Posts/ModifyPost.vue'



Vue.use(VueRouter)
//Vue.use(require('vue-moment'));

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  },
  {
    path: '/',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/modifyPost',
    name: 'ModifyPost',
    component: ModifyPost,
  },
  {
    path: '/modifyUser',
    name: 'ModifyUser',
    component: ModifyUser,
  }
]

const router = new VueRouter({
  mode: 'history',
  /*base: process.env.BASE_URL,*/
  routes
  
})

export default router