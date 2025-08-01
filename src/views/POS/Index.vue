<script setup>
/** All Library Import */
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useCartStore } from '@/stores/cart';
import { useProductStore } from '@/stores/product';
import { useCategoryStore } from '@/stores/category';
import { useBrandStore } from '@/stores/brand';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'POS';
const cartStore = useCartStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const router = useRouter();
const swal = inject('$swal')

cartStore.router = router;
cartStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')
const showModal = ref(false)

const filterFormData = reactive({
    category_id: '',
    brand_id: '',
})

const cartFormData = reactive({
    product_id: null,
    qty: 1,
})

const orderFormData = reactive({
    customer_name: null,
    customer_phone: null,
    payment_method: 'Cash',
    transaction_number: null,
    subtotal: 0,
    discount: 0,
    total: 0,
});

/** All Methods */
const addToCart = (product) => {
    cartFormData.product_id = product.id;

    cartStore.addToCart(cartFormData);

    cartStore.getCartItems();
}

const DeleteFromCart = (cart_id) => {
    cartStore.removeFromCart(cart_id);
}

const openOrderModal = () => {
    showModal.value = true;

    orderFormData.subtotal = parseFloat(cartStore.getSubtotal);
    orderFormData.total = parseFloat(cartStore.getSubtotal);
}

const getDiscount = _.debounce(() => {
  const sub = Number(cartStore.getSubtotal) || 0;
  const disc = Number(orderFormData.discount) || 0;
  orderFormData.total = sub - disc;
}, 300);


const handleConfirm = () => {
  showModal.value = false;
}

/** Hook & Computed */
onMounted(() => {
    cartStore.getCartItems();
    productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit + 2);
    categoryStore.getAllCategories();
    brandStore.getAllBrands();
})

watch(
    searchKeyword,
    _.debounce((current) => {
        productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit + 2, current)
    }, 500)
)
</script>

<template>
    <!-- Products & Carts -->
    <div class="flex justify-between gap-10">

        <!-- Products & Filter -->
        <div class="w-3/5">

            <!-- Filter & Search -->
            <div class="bg-white rounded-lg p-5 shadow-md mb-6">
                <div class="flex justify-between items-center gap-5">
                    <!-- Filter By Category -->
                    <select name="category" v-model="filterFormData.category_id" @change="productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit + 2, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                        <option value="">Filter Category</option>
                        <option v-for="(category, index) in categoryStore.categories" :key="category.id" :value="category.id">
                            {{ category.category_name }}
                        </option>
                    </select>

                    <!-- Filter By Brand -->
                    <select name="brand" v-model="filterFormData.brand_id" @change="productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit + 2, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                        <option value="">Filter Brand</option>
                        <option v-for="(brand, index) in brandStore.brands" :key="brand.id" :value="brand.id">
                            {{ brand.brand_name }}
                        </option>
                    </select>

                    <!-- Search -->
                    <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
                </div>
            </div>

            <!-- Product List -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="bg-white rounded-lg p-8 shadow-md text-center flex flex-col justify-between" v-for="(product, index) in productStore.products" :key="product.id">

                    <div class="">
                        <!-- Image -->
                        <img :src="productStore.getFileUrl + product.file" :alt="product.product_name" class="w-3/4 h-36 object-cover mx-auto rounded" />

                        <!-- Name -->
                        <h3 class="text-md font-semibold text-gray-800 dark:text-gray-100 mt-5">{{ product.product_name }}</h3>
                    </div>

                    <!-- Details -->
                    <div class="flex flex-col gap-2 mt-3">
                        <div class="flex items-center justify-between mt-2">
                            <!-- Pricing -->
                            <span class="text-xl font-bold text-mainColor dark:text-mainColor">${{ product.sell_price.slice(0, -3) }}<span class="text-sm align-super">.{{ product.sell_price.slice(-2)}}</span></span>

                            <!-- Stock -->
                            <span class="flex items-center gap-1 text-orange-500 font-medium">
                                <font-awesome-icon :icon="['fas', 'box-open']" class="text-xs" /> {{ product.stock }}
                            </span>
                        </div>
                    </div>

                    <!-- Button -->
                    <button class="mt-4 w-full bg-gradient-to-r from-[#43b9b2] to-[#36a39b] hover:from-[#36a39b] hover:to-[#2d8f88] dark:bg-gradient-to-r dark:from-[#43b9b2] dark:to-[#36a39b] text-white font-medium py-2 rounded-lg transition-colors duration-200 cursor-pointer" :disabled="product.stock == 0" @click.prevent="addToCart(product)">Add to Cart</button>
                </div>
            </div>

            <!-- Pagination -->
            <div class="mt-5 flex justify-center bg-white rounded-lg p-4 shadow-md">
                <v-pagination 
                    v-model="productStore.pagination.current_page"
                    :pages="productStore.pagination.last_page"
                    :range-size="1"
                    active-color="#DCEDFF"
                    @update:modelValue="productStore.getProducts(productStore.pagination.current_page, productStore.dataLimit + 2, searchKeyword)"
                />
            </div>
        </div>

        <!-- Carts -->
        <div class="bg-white rounded-lg p-5 shadow-md w-2/5">
            <h2 class="text-md font-semibold text-gray-800 pb-2 dark:text-gray-100">Carts</h2>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">#</th>
                            <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Name</th>
                            <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Image</th>
                            <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Price</th>
                            <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Qty</th>
                            <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left">Subtotal</th>
                            <th class="border border-gray-200 py-2.5 px-4 text-base font-semibold text-left"><font-awesome-icon :icon="['fas', 'fa-edit']" /></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(cart, index) in cartStore.carts" :key="cart.id">
                            <td class="border border-gray-200 p-3 text-sm font-medium">{{ index + 1 }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ cart.product_name }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                                <img :src="productStore.getFileUrl + cart.product?.file" class="w-12 h-12 mx-auto">
                            </td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">${{ cart.product?.sell_price }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 min-w-28 space-x-1">
                                <a href="javascript:void(0)" @click.prevent="cartStore.decreaseQty(cart.id)" class="inline bg-orange-600 rounded-md text-sm text-white font-medium py-0.5 px-1.5 transition duration-300 hover:opacity-70 hover:text-white">
                                    <font-awesome-icon :icon="['fas', 'minus']" class="text-xs" />
                                </a>
                                <span class="self-center inline">{{ cart.qty }}</span>
                                <a href="javascript:void(0)" @click.prevent="cartStore.increaseQty(cart.id)" class="inline bg-mainColor rounded-md text-sm text-white font-medium py-0.5 px-1.5 transition duration-300 hover:opacity-70 hover:text-white">
                                    <font-awesome-icon :icon="['fas', 'plus']" class="text-xs" />
                                </a>
                            </td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">${{ cart.subtotal }}</td>
                            <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                                <a href="javascript:void(0)" @click.prevent="DeleteFromCart(cart.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="space-y-5" v-if="cartStore.getSubtotal">
                <!-- Amount -->
                <div class="border border-gray-200 rounded p-5 mt-5">
                    <div class="flex items-center justify-between gap-2 pb-2"><h4>Sub Total:</h4> <span>${{ cartStore.getSubtotal }}</span></div>
                    <div class="flex items-center justify-between gap-2 py-2"><h4>Discount:</h4> <span>${{ cartStore.getSubtotal }}</span></div>
                    <div class="flex items-center justify-between gap-2 pt-3 border-t border-gray-300"><h4>Subtotal:</h4> <span class="text-rose-600">${{ cartStore.getSubtotal }}</span></div>
                </div>

                <!-- Confirm Order Button -->
                <button class="mt-4 mx-auto block w-auto bg-purple-600 text-white font-medium py-2 px-5 rounded-md transition-colors duration-200 cursor-pointer" @click.prevent="openOrderModal">Confirm Order</button>
            </div>

            <div v-else>
                <h2 class="text-center text-lg font-medium text-gray-700 mt-5">No Product In Cart</h2>
            </div>
        </div>
    </div>

    <!-- Confirm Order Modal -->
    <transition name="fade">
        <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
        <div class="bg-white rounded-md shadow-lg w-full max-w-xl mx-4">
            <!-- Modal Header -->
            <div class="flex justify-between items-center p-4 border-b border-gray-300">
                <h2 class="text-lg font-semibold text-gray-800">Order Confirmation</h2>
                <button @click="showModal = false" class="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">
                    &times;
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-4">
                <!-- Customer Name -->
                <div class="mb-4">
                    <label for="customer-name" class="block text-sm font-bold text-gray-700 mb-1.5">Customer Name (optional)</label>
                    <vee-field type="text" name="customer_name" id="customer-name" v-model="orderFormData.customer_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Customer Name" />
                    <ErrorMessage name="customer_name" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Customer Phone -->
                <div class="mb-4">
                    <label for="customer-phone" class="block text-sm font-bold text-gray-700 mb-1.5">Customer Phone <span class="text-rose-400">*</span></label>
                    <vee-field type="tel" name="customer_phone" id="customer-phone" v-model="orderFormData.customer_phone" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Customer Phone" />
                    <ErrorMessage name="customer_phone" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Payment Method -->
                <div class="mb-4">
                    <label for="payment-method" class="block text-sm font-bold text-gray-700 mb-1.5">Payment Method <span class="text-rose-400">*</span></label>
                    <vee-field as="select" name="payment_method" id="payment-method" v-model="orderFormData.payment_method" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
                        <option value="">Select Payment Method</option>
                        <option>{{  }}</option>
                    </vee-field>
                    <ErrorMessage name="payment_method" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Transaction Number -->
                <div class="mb-4" v-if="orderFormData.payment_method != 'Cash' && orderFormData.payment_method != ''">
                    <label for="transaction-number" class="block text-sm font-bold text-gray-700 mb-1.5">Transaction Number <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="transaction_number" id="transaction-number" v-model="orderFormData.transaction_number" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Transaction Number" />
                    <ErrorMessage name="transaction_number" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <!-- Subtotal -->
                    <div class="mb-4">
                        <label for="subtotal" class="block text-sm font-bold text-gray-700 mb-1.5">Subtotal <span class="text-rose-400">*</span></label>
                        <vee-field type="number" name="subtotal" id="subtotal" v-model="orderFormData.subtotal" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Subtotal" disabled readonly />
                        <ErrorMessage name="subtotal" class="text-xs text-rose-500 font-semibold my-2" />
                    </div>

                    <!-- Discount -->
                    <div class="mb-4">
                        <label for="discount" class="block text-sm font-bold text-gray-700 mb-1.5">Discount</label>
                        <vee-field type="number" name="discount" id="discount" @input="getDiscount" v-model.number="orderFormData.discount" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Discount" min="0" />
                        <ErrorMessage name="discount" class="text-xs text-rose-500 font-semibold my-2" />
                    </div>
                </div>

                <!-- Grand Total -->
                <div class="pt-4 border-t border-gray-300">
                    <label for="total" class="block text-sm font-bold text-gray-700 mb-1.5">Grand Total <span class="text-rose-400">*</span></label>
                    <vee-field type="number" name="total" id="total" v-model="orderFormData.total" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Grand Total" disabled readonly />
                    <ErrorMessage name="total" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end gap-2 p-4 border-t border-gray-300">
                <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer" @click="showModal = false">
                    Cancel
                </button>
                <button class="px-4 py-2 bg-mainColor text-white rounded cursor-pointer" @click="handleConfirm">
                    Confirm Order
                </button>
            </div>
        </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>