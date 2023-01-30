import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import BaseRouterView from '../components/BaseRouterView.vue'

import Admin from '../views/AdminView/AdminView.vue'
import AdminUsersViewVue from '../views/AdminView/AdminUsersView.vue'
import AdminCommunicationsViewVue from '../views/AdminView/AdminComsView.vue'
import AdminSalonsViewVue from '../views/AdminView/AdminSalonsView.vue'
import AdminNotifViewVue from '../views/AdminView/AdminNotifView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: BaseRouterView,
      children: [
        {
          path: '',
          component: Admin,
        },
      ],
    },
    {
      path: '/admin/users',
      component: BaseRouterView,
      children: [
        {
          path: '',
          component: AdminUsersViewVue,
        },
      ],
    },
    {
      path: '/admin/communications',
      component: BaseRouterView,
      children: [
        {
          path: '',
          component: AdminCommunicationsViewVue,
        },
      ],
    },
    {
      path: '/admin/salons',
      component: BaseRouterView,
      children: [
        {
          path: '',
          component: AdminSalonsViewVue,
        },
      ],
    },
    {
      path: '/admin/notifs',
      component: BaseRouterView,
      children: [
        {
          path: '',
          component: AdminNotifViewVue,
        },
      ],
    }
  ]
})

export default router
