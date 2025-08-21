<script setup>
/** All Library Import */
import { inject, onMounted, ref, reactive, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useTransferStore } from '@/stores/transfer';
import { useWarehouseStore } from '@/stores/warehouse';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Transfer List';
const transferStore = useTransferStore();
const warehouseStore = useWarehouseStore();
const router = useRouter();
const swal = inject('$swal');

transferStore.router = router;
transferStore.swal = swal;

/** All Variables */
const searchKeyword = ref('');
const filterFormData = reactive({
    date: null,
    warehouse: '',
})

/** All Methods */
const DeleteTransfer = (name, id) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            transferStore.deleteTransfer(id, (status) => {
                if(status === 'success') {
                    transferStore.getTransfers(transferStore.pagination.current_page, transferStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    transferStore.getTransfers(transferStore.pagination.current_page, transferStore.dataLimit);
    warehouseStore.getAllWareHouses();
})

watch(
    searchKeyword,
    _.debounce((current) => {
        transferStore.getTransfers(transferStore.pagination.current_page, transferStore.dataLimit, current, filterFormData)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ transferStore.getTotalCount }}</span></h2>

            <!-- Filter & Search -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                <!-- Filter By Date -->
                <input type="date" name="date" v-model="filterFormData.date" @change="transferStore.getTransfers(transferStore.pagination.current_page, transferStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer" />

                <!-- Filter By WareHouse -->
                    <select name="warehouse" v-model="filterFormData.warehouse" @change="transferStore.getTransfers(transferStore.pagination.current_page, transferStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                    <option value="">Filter by WareHouse</option>
                    <option v-for="(warehouse, index) in warehouseStore.warehouses" :key="warehouse.id" :value="warehouse.id">
                        {{ warehouse.warehouse_name }}
                    </option>
                </select>
                
                <!-- Search -->
                <input type="search" placeholder="Search..." v-model="searchKeyword" class="col-span-2 md:col-span-1 py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor">
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Transfers</h2>

            <router-link v-if="$can('create', 'Transfer')" :to="{ name: 'transferCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create New
            </router-link>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Transfared At</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Product Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Form</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">To</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="( transfer, index ) in transferStore.transfers" :key="transfer.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">
                            {{ ( transferStore.pagination.current_page * transferStore.dataLimit ) - transferStore.dataLimit + index + 1 }}
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(transfer.created_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ transfer.product?.product_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ transfer.from_warehouse?.warehouse_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ transfer.to_warehouse?.warehouse_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">           
                            <a v-if="$can('delete', 'Transfer')" href="javascript:void(0)" @click.prevent="DeleteTransfer(transfer.product?.product_name, transfer.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = transferStore.pagination.current_page
                :pages = transferStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "transferStore.getTransfers(transferStore.pagination.current_page, transferStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>
