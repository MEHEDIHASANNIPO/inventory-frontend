<script setup>
/** All Library Import */
import { inject, ref, onMounted} from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import { useOrderStore } from '@/stores/order';
import CircleChart from '../Chart/CircleChart.vue';

/** All Instance */
const dashboardStore = useDashboardStore();
const orderStore = useOrderStore();
const swal = inject('$swal')

dashboardStore.swal = swal;

/** All Variables */


/** All Methods */

/** Hook & Computed */
onMounted(() => {
    dashboardStore.getDashboardInfo();
    orderStore.getOrders();
})
</script>

<template>
    <!-- Dashboard Chart & Table -->
    <div class="flex flex-col md:flex-row gap-5 py-10">
        <div class="w-full xl:w-1/3 bg-white rounded-lg p-4 shadow-md max-sm:overflow-x-auto">
            <CircleChart title="Expenses" :labels="dashboardStore.months" :data="dashboardStore.expense" text="Expense" />
        </div>
        <div class="w-full xl:w-2/3 bg-white rounded-lg p-5 shadow-md">
            <!-- Dashboard Table -->
            <h2 class="text-lg font-bold text-gray-700 mb-5">Latest Order</h2>
            <div class="overflow-x-auto w-full">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                            <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Customer Name</th>
                            <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Customer Phone</th>
                            <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Amount</th>
                            <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Payment Method</th>
                            <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, index) in orderStore.orders" :key="order.id" v-show="index <= 5">
                            <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ index+1 }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.customer?.name }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.customer?.phone }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.total }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700"><span class="bg-mainColor text-white text-xs font-bold py-1 px-1.5 rounded-md">{{ order.payment_method }}</span></td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.transaction_number }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Dashboard Table -->
        </div>
    </div>
    <!-- Dashboard Chart & Table -->
</template>