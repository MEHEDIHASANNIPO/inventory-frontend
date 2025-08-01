<script setup>
/** All Library Import */
import { inject, onMounted, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useCustomerStore } from '@/stores/customer';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Customer List';
const customerStore = useCustomerStore();
const router = useRouter();
const swal = inject('$swal')

customerStore.router = router;
customerStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')

/** All Methods */
const DeleteCustomer = (name, id) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            customerStore.deleteCustomer(id, (status) => {
                if(status == 'success') {
                    customerStore.getCustomers(customerStore.pagination.current_page, customerStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    customerStore.getCustomers(customerStore.pagination.current_page, customerStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current) => {
        customerStore.getCustomers(customerStore.pagination.current_page, customerStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ customerStore.getTotalCount }}</span></h2>
            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Customers</h2>
            <router-link v-if="$can('create', 'Customer')" :to="{ name: 'customerCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create New
            </router-link>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Last Updated</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Email</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Phone</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Image</th>
                        <th v-if="$can('edit', 'Customer')" class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Status</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="( customer, index ) in customerStore.customers" :key="customer.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( customerStore.pagination.current_page * customerStore.dataLimit ) - customerStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(customer.updated_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ customer.name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ customer.email }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ customer.phone }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <template v-if="customer.file">
                                <img :src="customerStore.getFileUrl + customer.file" download class="w-12 h-12 mx-auto">
                            </template>
                        </td>
                        <td v-if="$can('edit', 'Customer')" class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" @change.prevent="customerStore.changeStatus(customer.id)" :checked="customer.is_active">
                                <div class="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-mainColor rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mainColor"></div>
                            </label>
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'Customer')" :to="{ name: 'customerEdit', params: { id: customer.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link>
                            <a v-if="$can('delete', 'Customer')" href="javascript:void(0)" @click.prevent="DeleteCustomer(customer.name, customer.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = customerStore.pagination.current_page
                :pages = customerStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "customerStore.getCustomers(customerStore.pagination.current_page, customerStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>
