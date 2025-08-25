<script setup>
/** All Library Import */
import { inject, ref, onMounted} from 'vue';
import { useDashboardStore } from '@/stores/dashboard';

/** All Instance */
const dashboardStore = useDashboardStore();
const swal = inject('$swal')

dashboardStore.swal = swal;

/** All Variables */


/** All Methods */

/** Hook & Computed */
onMounted(() => {
    dashboardStore.getDashboardInfo();
})
</script>
<template>
    <!-- Dashboard Counter -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-5 xl:gap-6 xxl:gap-10">
        <div class="bg-white shadow rounded-lg p-4 xl:p-6">
            <div class="flex items-start justify-between gap-3 mb-5">
                <span class="w-12 h-12 flex items-center justify-center bg-rose-100 text-rose-600 rounded-lg">
                    <font-awesome-icon :icon="['fas', 'dollar-sign']" />
                </span>
                <router-link :to="{name: 'orders'}" class="bg-mainColor text-white text-xs font-bold py-1 px-1.5 rounded-md">View All</router-link>
            </div>
            <h4 class="text-base xl:text-lg font-medium text-gray-700">Total Profit</h4>
            <h2 class="text-xl font-medium text-gray-600">${{ dashboardStore.dashboardInfo.profit }}</h2>
        </div>
        <div class="bg-white shadow rounded-lg p-4 xl:p-6">
            <div class="flex items-start justify-between gap-3 mb-5">
                <span class="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
                    <font-awesome-icon :icon="['fas', 'basket-shopping']" />
                </span>
                <router-link :to="{name: 'products'}" class="bg-mainColor text-white text-xs font-bold py-1 px-1.5 rounded-md">View All</router-link>
            </div>
            <h4 class="text-base xl:text-lg font-medium text-gray-700">Total Product</h4>
            <h2 class="text-xl font-medium text-gray-600">{{ dashboardStore.dashboardInfo.products }}</h2>
        </div>
        <div class="bg-white shadow rounded-lg p-4 xl:p-6">
            <div class="flex items-start justify-between gap-3 mb-5">
                <span class="w-12 h-12 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-lg">
                    <font-awesome-icon :icon="['fas', 'shopping-cart']" />
                </span>
                <router-link :to="{name: 'orders'}" class="bg-mainColor text-white text-xs font-bold py-1 px-1.5 rounded-md">View All</router-link>
            </div>
            <h4 class="text-base xl:text-lg font-medium text-gray-700">Total Sales</h4>
            <h2 class="text-xl font-medium text-gray-600">{{ dashboardStore.dashboardInfo.sales }}</h2>
        </div>
        <div class="bg-white shadow rounded-lg p-4 xl:p-6">
            <div class="flex items-start justify-between gap-3 mb-5">
                <span class="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-lg">
                    <font-awesome-icon :icon="['fas', 'users']" />
                </span>
                <router-link :to="{name: 'customers'}" class="bg-mainColor text-white text-xs font-bold py-1 px-1.5 rounded-md">View All</router-link>
            </div>
            <h4 class="text-base xl:text-lg font-medium text-gray-700">Total Customers</h4>
            <h2 class="text-xl font-medium text-gray-600">{{ dashboardStore.dashboardInfo.customers }}</h2>
        </div>
    </div>
    <!-- Dashboard Counter -->
</template>