<script setup>
/** All Library Import */
import { inject, onMounted, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useProductStore } from '@/stores/product';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Product List';
const productStore = useProductStore();
const router = useRouter();
const swal = inject('$swal')

productStore.router = router;
productStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')

/** All Methods */
const DeleteProduct = (name, id) => {
    swal({
        title: `Do you want to delete this product: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if (result.isConfirmed) {
            productStore.deleteProduct(id, (status) => {
                if (status == 'success') {
                    productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current) => {
        productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ productStore.getTotalCount }}</span></h2>

            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Products</h2>

            <router-link v-if="$can('create', 'Product')" :to="{ name: 'productCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create Product
            </router-link>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Last Updated</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Image</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Product Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Code</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Original Price</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Sell Price</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Stock</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">QrCode</th>
                        <th v-if="$can('edit', 'Product')" class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Status</th>
                        <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(product, index) in productStore.products" :key="product.id">
                        <td class="border border-gray-200 p-3 text-sm font-medium">{{ (productStore.pagination.current_page * productStore.dataLimit) - productStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(product.updated_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <template v-if="product.file">
                                <img :src="productStore.getFileUrl + product.file" download class="w-12 h-12 mx-auto">
                            </template>
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.product_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.product_code }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.original_price }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.sell_price }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ product.stock }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <template v-if="product.qrcode">
                                <img :src="productStore.getFileUrl + product.qrcode" download class="w-12 h-12 mx-auto">
                            </template>
                        </td>
                        <td v-if="$can('edit', 'Product')" class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" @change.prevent="productStore.changeStatus(product.id)" :checked="product.is_active">
                                <div class="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-mainColor rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mainColor"></div>
                            </label>
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'Product')" :to="{ name: 'productEdit', params: { id: product.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                            </router-link>
                            <a v-if="$can('delete', 'Product')" href="javascript:void(0)" @click.prevent="DeleteProduct(product.product_name, product.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model="productStore.pagination.current_page"
                :pages="productStore.pagination.last_page"
                :range-size="1"
                active-color="#DCEDFF"
                @update:modelValue="productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>
