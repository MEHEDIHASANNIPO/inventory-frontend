import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useSystemSettingStore } from '@/stores/systemsetting'
import { useLoginStore } from '@/stores/login'
import { defineAbilitiesFromSlugs } from '@/utilis/ability';

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
        { path: '/system-setting', name: 'systemSetting', component: () => import('@/views/SystemSetting/SystemSetting.vue'), meta: { title: 'General Setting', permission : 'general-setting' } },

        // Profile Setting Route
        { path: '/profile-setting', name: 'profileSetting', component: () => import('@/views/ProfileSetting/ProfileSetting.vue'), meta: { title: 'Profile Setting', permission: 'update-profile' } },

        // Password Change Route
        { path: '/change-password', name: 'changePassword', component: () => import('@/views/ProfileSetting/ChangePassword.vue'), meta: { title: 'Change Password', permission: 'change-password' } },

        // Module Management Routes
        { path: '/modules', name: 'modules', component: () => import('@/views/Module/Index.vue'), meta: { title: 'Module List', permission: 'index-module' } },
        { path: '/module/create', name: 'moduleCreate', component: () => import('@/views/Module/Create.vue'), meta: { title: 'Create Module', permission: 'create-module' } },
        { path: '/module/edit/:id', name: 'moduleEdit', component: () => import('@/views/Module/Edit.vue'), meta: { title: 'Edit Module', permission: 'edit-module' } },

        // Permission Management Routes
        { path: '/permissions', name: 'permissions', component: () => import('@/views/Permission/Index.vue'), meta: { title: 'Permission List', permission: 'index-permission' } },
        { path: '/permission/create', name: 'permissionCreate', component: () => import('@/views/Permission/Create.vue'), meta: { title: 'Create Permission', permission: 'create-permission' } },
        { path: '/permission/edit/:id', name: 'permissionEdit', component: () => import('@/views/Permission/Edit.vue'), meta: { title: 'Edit Permission', permission: 'edit-permission' } },

        // Role Management Routes
        { path: '/roles', name: 'roles', component: () => import('@/views/Role/Index.vue'), meta: { title: 'Role List', permission: 'index-role' } },
        { path: '/role/create', name: 'roleCreate', component: () => import('@/views/Role/Create.vue'), meta: { title: 'Create Role', permission: 'create-role' } },
        { path: '/role/edit/:id', name: 'roleEdit', component: () => import('@/views/Role/Edit.vue'), meta: { title: 'Edit Role', permission: 'edit-role' } },

        // POS Management Route
        { path: '/pos', name: 'posIndex', component: () => import('@/views/POS/Index.vue'), meta: { title: 'POS', permission: 'index-pos' } },

        // Category Management Routes
        { path: '/categories', name: 'categories', component: () => import('@/views/Category/Index.vue'), meta: { title: 'Category List', permission: 'index-category' } },
        { path: '/category/create', name: 'categoryCreate', component: () => import('@/views/Category/Create.vue'), meta: { title: 'Create Category', permission: 'create-category' } },
        { path: '/category/edit/:id', name: 'categoryEdit', component: () => import('@/views/Category/Edit.vue'), meta: { title: 'Edit Category', permission: 'edit-category' } },

        // Brand Management Routes
        { path: '/brands', name: 'brands', component: () => import('@/views/Brand/Index.vue'), meta: { title: 'Brand List', permission: 'index-brand' } },
        { path: '/brand/create', name: 'brandCreate', component: () => import('@/views/Brand/Create.vue'), meta: { title: 'Create Brand', permission: 'create-brand' } },
        { path: '/brand/edit/:id', name: 'brandEdit', component: () => import('@/views/Brand/Edit.vue'), meta: { title: 'Edit Brand', permission: 'edit-brand' } },

        // WareHouse Management Routes
        { path: '/warehouses', name: 'warehouses', component: () => import('@/views/WareHouse/Index.vue'), meta: { title: 'WareHouse List', permission: 'index-warehouse' } },
        { path: '/warehouse/create', name: 'warehouseCreate', component: () => import('@/views/WareHouse/Create.vue'), meta: { title: 'Create WareHouse', permission: 'create-warehouse' } },
        { path: '/warehouse/edit/:id', name: 'warehouseEdit', component: () => import('@/views/WareHouse/Edit.vue'), meta: { title: 'Edit WareHouse', permission: 'edit-warehouse' } },

        // Supplier Management Routes
        { path: '/suppliers', name: 'suppliers', component: () => import('@/views/Supplier/Index.vue'), meta: { title: 'Supplier List', permission: 'index-supplier' } },
        { path: '/supplier/create', name: 'supplierCreate', component: () => import('@/views/Supplier/Create.vue'), meta: { title: 'Create Supplier', permission: 'create-supplier' } },
        { path: '/supplier/edit/:id', name: 'supplierEdit', component: () => import('@/views/Supplier/Edit.vue'), meta: { title: 'Edit Supplier', permission: 'edit-supplier' } },

        // Product Management Routes
        { path: '/products', name: 'products', component: () => import('@/views/Product/Index.vue'), meta: { title: 'Product List', permission: 'index-product' } },
        { path: '/product/create', name: 'productCreate', component: () => import('@/views/Product/Create.vue'), meta: { title: 'Create Product', permission: 'create-product' } },
        { path: '/product/edit/:id', name: 'productEdit', component: () => import('@/views/Product/Edit.vue'), meta: { title: 'Edit Product', permission: 'edit-product' } },

        // Expense Category Routes
        { path: '/expense/categories', name: 'expenseCategories', component: () => import('@/views/ExpenseCategory/Index.vue'), meta: { title: 'Expense Category List', permission: 'index-expense-category' } },
        { path: '/expense/category/create', name: 'expenseCategoryCreate', component: () => import('@/views/ExpenseCategory/Create.vue'), meta: { title: 'Create Expense Category', permission: 'create-expense-category' } },
        { path: '/expense/category/edit/:id', name: 'expenseCategoryEdit', component: () => import('@/views/ExpenseCategory/Edit.vue'), meta: { title: 'Edit Expense Category', permission: 'edit-expense-category' } },

        // Expense Management Routes
        { path: '/expenses', name: 'expenses', component: () => import('@/views/Expense/Index.vue'), meta: { title: 'Expense List', permission: 'index-expense' } }, 
        { path: '/expense/create', name: 'expenseCreate', component: () => import('@/views/Expense/Create.vue'), meta: { title: 'Create Expense', permission: 'create-expense' } }, 
        { path: '/expense/edit/:id', name: 'expenseEdit', component: () => import('@/views/Expense/Edit.vue'), meta: { title: 'Edit Expense', permission: 'edit-expense' } },

        // Employee Management Routes
        { path: '/employees', name: 'employees', component: () => import('@/views/Employee/Index.vue'), meta: { title: 'Employee List', permission: 'index-employee' } },
        { path: '/employee/create', name: 'employeeCreate', component: () => import('@/views/Employee/Create.vue'), meta: { title: 'Create Employee', permission: 'create-employee' } },
        { path: '/employee/edit/:id', name: 'employeeEdit', component: () => import('@/views/Employee/Edit.vue'), meta: { title: 'Edit Employee', permission: 'edit-employee' } },

        // Salary Management Routes
        { path: '/salaries', name: 'salaries', component: () => import('@/views/Salary/Index.vue'), meta: { title: 'Salary List', permission: 'index-salary' } },
        { path: '/salary/create', name: 'salaryCreate', component: () => import('@/views/Salary/Create.vue'), meta: { title: 'Create Salary', permission: 'create-salary' } },
        { path: '/salary/edit/:id', name: 'salaryEdit', component: () => import('@/views/Salary/Edit.vue'), meta: { title: 'Edit Salary', permission: 'edit-salary' } },

        // Customer Management Routes
        { path: '/customers', name: 'customers', component: () => import('@/views/Customer/Index.vue'), meta: { title: 'Customer List', permission: 'index-customer' } },
        { path: '/customer/create', name: 'customerCreate', component: () => import('@/views/Customer/Create.vue'), meta: { title: 'Create Customer', permission: 'create-customer' } },
        { path: '/customer/edit/:id', name: 'customerEdit', component: () => import('@/views/Customer/Edit.vue'), meta: { title: 'Edit Customer', permission: 'edit-customer' } },
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
      component: () => import('@/views/errors/NotFound.vue'),
      meta: { title: '404 Not Found' }
    },

    /** Unauthorized Route */
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/errors/Unauthorized.vue'),
      meta: { title: 'Unauthorized' }
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

    // Permission
    const requiredPermission = to.meta.permission;
    const loginStore = useLoginStore();
    
    if (requiredPermission) {
      const ability = defineAbilitiesFromSlugs(loginStore.getPermissions);
      const parts = requiredPermission.split('-');
      const action = parts[0];
      const subject = parts.slice(1)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');


      if (!ability.can(action, subject)) {
        return next({ name: 'unauthorized' });
      }
    }

    next()
  }
})

export default router
