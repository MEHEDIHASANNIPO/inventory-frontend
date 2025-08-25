<script setup>
/** All Library Import */
import { inject, ref, onMounted} from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import BarChart from '../Chart/BarChart.vue';
import LineChart from '../Chart/LineChart.vue';

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
    <!-- Dashboard Chart -->
    <div class="flex flex-col md:flex-row gap-5">
        <div class="w-full xl:w-3/5 bg-white rounded-lg p-4 shadow-md">
            <BarChart title="Monthly Sales" :labels="dashboardStore.months" :data="dashboardStore.sales" text="Sale"/>
        </div>
        <div class="w-full xl:w-2/5 bg-white rounded-lg p-4 shadow-md overflow-hidden">
            <LineChart class="min-h-full" title="Monthly Revenue" :labels="dashboardStore.months" :data="dashboardStore.revenue" text="Profit" />
        </div>
    </div>
    <!-- Dashboard Chart -->
</template>