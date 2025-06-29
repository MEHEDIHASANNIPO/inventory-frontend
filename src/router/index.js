import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    /** Auth Routes */
    {
      path: '/',
      redirect: '/dashboard',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [

        // Dashboard Route
        { path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue') },
      ]
    },

    /** Guest Routes */
    {
      path: '/auth',
      redirect: '/login',
      component: AuthLayout,
      meta: { isGuest: true },
      children: [

        // Login Route
        { path: '/login', name: 'login', component: () => import('@/views/Auth/Login.vue') },
      ]
    },

    /** 404 Not Found Route */
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ],
})


// Middleware
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !localStorage.getItem('token')) {
    next({name: 'login'});
  } else if (to.meta.isGuest && localStorage.getItem('token')) {
    next({name: 'dashboard'});
  } else {
    next()
  }
})

export default router
