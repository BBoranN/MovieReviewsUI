import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginForm from '../components/LoginForm.vue'
import Register from '../components/Register.vue'
import Home from '../views/HomeView.vue'
import Main from '../components/MainPage.vue'
import Media from '../components/Media.vue'
import Search from '../components/Search.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import MyProfileMain from '@/components/MyProfileMain.vue'
import MyReviews from '@/components/MyReviews.vue'
import MyLists from '@/components/MyLists.vue'
import EditProfile from '@/components/EditProfile.vue'
import ProfileView from '@/views/UserProfileView.vue'
import UserProfile from '@/components/UserProfileMain.vue'
import UserLists from '@/components/UserLists.vue'
import UserReviews from '@/components/UserReviews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      children: [
        {
          path: '',
          name: 'login',
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
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component: MyProfileView,
      children: [
        {
          path: '',
          name: 'myprofilemain',
          component: MyProfileMain
        },
        {
          path: 'myreviews',
          name: 'myreviews',
          component: MyReviews
        },
        {
          path: 'mylists',
          name: 'mylists',
          component: MyLists
        },
        {
          path: 'editprofile',
          name: 'editprofile',
          component: EditProfile
        }
        
      ]
    },
    {
      path: '/userprofile',
      name: 'userprofile',
      component: ProfileView,
      children: [
        {
          path: ':userid',
          name: 'userprofilemain',
          component: UserProfile
        },
        {
          path: 'lists/:userid',
          name: 'userlists',
          component: UserLists
        },
        {
          path: 'reviews/:userid',
          name: 'userreviews',
          component: UserReviews
        }
      ]
    }
      
  ]
})

export default router
