import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginForm from '../components/LoginForm.vue'
import Register from '../components/Register.vue'
import Home from '../views/HomeView.vue'
import Main from '../components/MainPage.vue'
import Media from '../components/Media.vue'

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
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component:Main
        },
        {
          path: ':name',
          component:Media
        },
      ]
    }
      
  ]
})

export default router
