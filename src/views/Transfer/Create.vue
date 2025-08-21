<script setup>
/** All Library Import */
import { inject, reactive, ref, onMounted, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useTransferStore } from '@/stores/transfer';
import { useProductStore } from '@/stores/product';
import { useWarehouseStore } from '@/stores/warehouse';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Create Transfer';
const transferStore = useTransferStore();
const productStore = useProductStore();
const warehouseStore = useWarehouseStore();
const router = useRouter();
const swal = inject('$swal')

transferStore.router = router;
transferStore.swal = swal;

/** All Variables */
const searchKeyword = ref('');

const formData = reactive({
    products: [],
    warehouse_id: null
})

console.log(formData)

const schema = reactive({
  warehouse_id: 'required|max:255',
})

/** All Methods */
const StoreTransfer = () => {
    transferStore.storeTransfer(formData);
}
const addProduct = (product) => {
  const exists = formData.products.find(p => p.id === product.id)
  if (!exists) {
    formData.products.push(product)
  }

  searchKeyword.value = '';
}

const removeProduct = (id) => {
  formData.products = formData.products.filter(p => p.id !== id)
}

/** Hook & Computed */
onMounted(() => {
    warehouseStore.getAllWareHouses();
})

watch(
    searchKeyword,
    _.debounce((current) => {
        productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Button -->
        <div v-if="$can('index', 'Transfer')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'transfers' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>

        <!-- Search Product -->
        <div class="mb-5">
            <label for="search" class="block text-sm font-bold text-gray-700 mb-1.5">Search Product <span class="text-rose-400">*</span></label>
            <input type="search" id="search" placeholder="Search by name or code" v-model="searchKeyword" class="py-2 px-3 bg-gray-200 border border-gray-200 rounded-md focus:outline-mainColor w-full"></input>

            <!-- Search Product Result -->
            <div class="bg-white rounded-lg p-5 shadow-md" v-if="searchKeyword != '' && productStore.products.length">
                <ul class="space-y-2">
                    <li v-for="(product, index) in productStore.products" :key="index" :class="index !== productStore.products.length - 1 ? 'border-b border-gray-300 pb-2' : ''">
                        <a href="javascript:void(0)" @click.prevent="addProduct(product)" class="flex items-center justify-start gap-3">
                            <span>({{ index + 1 }}).</span> 
                            <span>{{ product.product_name }}</span>
                            <span><span class="bg-cyan-500 py-0.5 px-2 rounded shadow text-sm font-semibold text-gray-50">Price:</span> ${{ product.sell_price }}</span>
                            <span><span class="bg-mainColor py-0.5 px-2 rounded shadow text-sm font-semibold text-gray-50">WareHouse:</span> {{ product.warehouse?.warehouse_name }}</span>
                            <span><span class="bg-rose-500 py-0.5 px-2 rounded shadow text-sm font-semibold text-gray-50">Stock:</span> {{ product.stock }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- Slected Product -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">WareHouse</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Price</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Stock</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="( product, index ) in formData.products" :key="index">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.product_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.warehouse?.warehouse_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.sell_price }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.stock }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <a href="javascript:void(0)" @click.prevent="removeProduct(product.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="StoreTransfer" validate-on-input>
            <!-- Transfer Name -->
            <div class="mt-5">
                <label for="warehouse-name" class="block text-sm font-bold text-gray-700 mb-1.5">Transfer To <span class="text-rose-400">*</span></label>
                <vee-field as="select" name="warehouse_id" id="warehouse-name" v-model="formData.warehouse_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
                    <option value="">Select A Warehouse</option>
                    <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.id" :value="warehouse.id">{{ warehouse.warehouse_name }}</option>
                </vee-field>
                <ErrorMessage name="warehouse_id" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer" :disabled="!productStore.products.length">
                Transfer
            </button>
        </vee-form>
    </div>
</template>
