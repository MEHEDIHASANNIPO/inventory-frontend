import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useSystemSettingStore } from '@/stores/systemsetting'

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
        { path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue'), meta: { title: 'Dashboard' } },

        // System Setting Route
        { path: '/system-setting', name: 'systemSetting', component: () => import('@/views/SystemSetting/SystemSetting.vue'), meta: { title: 'General Setting' } },

        // Profile Setting Route
        { path: '/profile-setting', name: 'profileSetting', component: () => import('@/views/ProfileSetting/ProfileSetting.vue'), meta: { title: 'Profile Setting' } },

        // Password Change Route
        { path: '/change-password', name: 'changePassword', component: () => import('@/views/ProfileSetting/ChangePassword.vue'), meta: { title: 'Change Password' } },
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
        { path: '/login', name: 'login', component: () => import('@/views/Auth/Login.vue'), meta: { title: 'Login' } },
      ]
    },

    /** 404 Not Found Route */
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: '404 Not Found' }
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
    // Dynamic Title
    const systemSettingStore = useSystemSettingStore();
    if(!systemSettingStore.loaded) {
      systemSettingStore.systemSettingInfo();
    }
    const siteName = systemSettingStore.siteName || 'MHN Inventory';
    const pageTitle = to.meta.title ? `${to.meta.title} | ${siteName}` : siteName;
    document.title = pageTitle;

    next()
  }
})

export default router
