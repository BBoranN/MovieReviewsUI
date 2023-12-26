import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginForm from '../components/LoginForm.vue'
import Register from '../components/Register.vue'
import Home from '../views/HomeView.vue'
import Main from '../components/MainPage.vue'
import Media from '../components/Media.vue'
import Search from '../components/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      children: [
        {
          path: 'Login',
          component: LoginForm,
        },
        {
          path: 'Register',
          component: Register,
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'main',
          component:Main
        },
        {
          path: ':name',
          name: 'media',
          component: Media
        },
        {
          path: 'search/:name',
          name: 'search',
          component: Search
        }
      ]
    }
      
  ]
})

export default router
