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

        // Module Management Routes
        { path: '/modules', name: 'modules', component: () => import('@/views/Module/Index.vue'), meta: { title: 'Module List' } },
        { path: '/module/create', name: 'moduleCreate', component: () => import('@/views/Module/Create.vue'), meta: { title: 'Create Module' } },
        { path: '/module/edit/:id', name: 'moduleEdit', component: () => import('@/views/Module/Edit.vue'), meta: { title: 'Edit Module' } },

        // Permission Management Routes
        { path: '/permissions', name: 'permissions', component: () => import('@/views/Permission/Index.vue'), meta: { title: 'Permission List' } },
        { path: '/permission/create', name: 'permissionCreate', component: () => import('@/views/Permission/Create.vue'), meta: { title: 'Create Permission' } },
        { path: '/permission/edit/:id', name: 'permissionEdit', component: () => import('@/views/Permission/Edit.vue'), meta: { title: 'Edit Permission' } },

        // Role Management Routes
        { path: '/roles', name: 'roles', component: () => import('@/views/Role/Index.vue'), meta: { title: 'Role List' } },
        { path: '/role/create', name: 'roleCreate', component: () => import('@/views/Role/Create.vue'), meta: { title: 'Create Role' } },
        { path: '/role/edit/:id', name: 'roleEdit', component: () => import('@/views/Role/Edit.vue'), meta: { title: 'Edit Role' } },
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
