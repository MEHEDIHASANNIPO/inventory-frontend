<script setup>
/** All Library Import */
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useOrderStore } from '@/stores/order';
import { useCustomerStore } from '@/stores/customer';
import { useRouter } from 'vue-router';
import { getMonths, getYears } from '@/helpers/helper'
import _ from 'lodash';

/** All Instance */
PageName.value = 'Sales History';
const orderStore = useOrderStore();
const customerStore = useCustomerStore();
const router = useRouter();
const swal = inject('$swal')

orderStore.router = router;
orderStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')
const filterFormData = reactive({
    customer_id: '',
    created_at: '',
    month: '',
    year: '',
    payment: '',
})

/** All Methods */
const DownloadInvoice = (invoice_id) => {
    orderStore.downloadInvoice(invoice_id);
}

/** Hook & Computed */
onMounted(() => {
    orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit);
    customerStore.getAllCustomers();
})

watch(
    searchKeyword,
    _.debounce((current, previous) => {
        orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit, current, searchKeyword, filterFormData)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ orderStore.getTotalCount }}</span></h2>

            <!-- Search -->
            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>

        <!-- Filter -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-5 mt-5">
            <!-- Filter By Customer -->
            <select name="customer" v-model="filterFormData.customer_id" @change="orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer max-sm:col-span-2">
                <option value="">Filter by Customer</option>
                <option v-for="(customer, index) in customerStore.customers" :key="customer.id" :value="customer.id">
                    {{ customer.name }}
                </option>
            </select>

            <!-- Filter By Date -->
            <input type="date" name="date" v-model="filterFormData.created_at" @change="orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer" />

            <!-- Filter By Month -->
            <select name="month" v-model="filterFormData.month" @change="orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                <option value="">Filter by Month</option>
                <option v-for="(month, index) in getMonths()" :key="index + 1" :value="index + 1">
                    {{ month }}
                </option>
            </select>

            <!-- Filter By Year -->
            <select name="year" v-model="filterFormData.year" @change="orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                <option value="">Filter by Year</option>
                <option v-for="(year, index) in getYears(2010)" :key="index" :value="year">
                    {{ year }}
                </option>
            </select>

            <!-- Filter By Payment -->
            <select name="payment" v-model="filterFormData.payment" @change="orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                <option value="">Filter by Payment</option>
                <option v-for="(payment, index) in orderStore.paymentMethods" :key="index" :value="payment">
                    {{ payment }}
                </option>
            </select>
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Sales</h2>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Ordered On</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Customer Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Phone</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Subtotal</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Discount</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Total</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Transaction</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Payment</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Invoice Id</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Reciept</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="( order, index ) in orderStore.orders" :key="order.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( orderStore.pagination.current_page * orderStore.dataLimit ) - orderStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(order.created_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.customer?.name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.customer?.phone }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">${{ order.subtotal }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">${{ order.discount }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">${{ order.total }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.transaction_number }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.payment_method }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ order.invoice_id }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <a href="javascript:void(0)" @click.prevent="DownloadInvoice(order.invoice_id)" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1">
                                <font-awesome-icon :icon="['fas', 'download']" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = orderStore.pagination.current_page
                :pages = orderStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "orderStore.getOrders(orderStore.pagination.current_page, orderStore.dataLimit, searchKeyword, filterFormData)"
            />
        </div>
    </div>
</template>
