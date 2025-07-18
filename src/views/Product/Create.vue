<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useProductStore } from '@/stores/product';
import { useCategoryStore } from '@/stores/category';
import { useBrandStore } from '@/stores/brand';
import { useSupplierStore } from '@/stores/supplier';
import { useWarehouseStore } from '@/stores/warehouse';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'Create Product';
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const supplierStore = useSupplierStore();
const warehouseStore = useWarehouseStore();
const router = useRouter();
const swal = inject('$swal')

productStore.router = router;
productStore.swal = swal;

/** All Variables */
const formData = reactive({
    category_id: null,
    brand_id: null,
    supplier_id: null,
    warehouse_id: null,
    product_name: null,
    stock: 0,
    original_price: 0,
    sell_price: 0,
    description: null,
    file: null
});

const schema = reactive({
    category_id: 'required',
    brand_id: 'required',
    supplier_id: 'required',
    warehouse_id: 'required',
    product_name: 'required|max:255',
    stock: 'required|min:0|min_value:1',
    original_price: 'required|min:0',
    sell_price: 'required|min:0',
});

const files = [];

/** All Methods */
const StoreProduct = () => {
    productStore.storeProduct(formData);
};

const uploadFile = (fileItems) => {
    files.value = fileItems;
    formData.file = fileItems.length ? fileItems[0].file : null;
};

/** Hook & Computed */
onMounted(() => {
    categoryStore.getAllCategories();
    brandStore.getAllBrands();
    supplierStore.getAllSuppliers();
    warehouseStore.getAllWareHouses();
})
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Back Button -->
        <div v-if="$can('index', 'Product')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'products' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>

        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="StoreProduct" validate-on-input enctype="multipart/form-data">

            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <!-- Category Name -->
                <div>
                    <label for="category-name" class="block text-sm font-bold text-gray-700 mb-1.5">Category Name <span class="text-rose-400">*</span></label>
                    <vee-field as="select" name="category_id" id="category-name" v-model="formData.category_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
                        <option value="">Select A Category</option>
                        <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">{{ category.category_name }}</option>
                    </vee-field>
                    <ErrorMessage name="category_id" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Brand Name -->
                <div>
                    <label for="brand-name" class="block text-sm font-bold text-gray-700 mb-1.5">Brand Name <span class="text-rose-400">*</span></label>
                    <vee-field as="select" name="brand_id" id="brand-name" v-model="formData.brand_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
                        <option value="">Select A Brand</option>
                        <option v-for="brand in brandStore.brands" :key="brand.id" :value="brand.id">{{ brand.brand_name }}</option>
                    </vee-field>
                    <ErrorMessage name="brand_id" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Supplier Name -->
                <div>
                    <label for="supplier-name" class="block text-sm font-bold text-gray-700 mb-1.5">Supplier Name <span class="text-rose-400">*</span></label>
                    <vee-field as="select" name="supplier_id" id="supplier-name" v-model="formData.supplier_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
                        <option value="">Select A Supplier</option>
                        <option v-for="supplier in supplierStore.suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
                    </vee-field>
                    <ErrorMessage name="supplier_id" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Warehouse Name -->
                <div>
                    <label for="warehouse-name" class="block text-sm font-bold text-gray-700 mb-1.5">Warehouse Name <span class="text-rose-400">*</span></label>
                    <vee-field as="select" name="warehouse_id" id="warehouse-name" v-model="formData.warehouse_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
                        <option value="">Select A Warehouse</option>
                        <option v-for="warehouse in warehouseStore.warehouses" :key="warehouse.id" :value="warehouse.id">{{ warehouse.warehouse_name }}</option>
                    </vee-field>
                    <ErrorMessage name="warehouse_id" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <!-- Product Name -->
            <div class="my-5">
                <label for="product-name" class="block text-sm font-bold text-gray-700 mb-1.5">Product Name <span class="text-rose-400">*</span></label>
                <vee-field type="text" name="product_name" id="product-name" v-model="formData.product_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Full Name" required />
                <ErrorMessage name="product_name" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <!-- Original Price -->
                <div>
                    <label for="original-price" class="block text-sm font-bold text-gray-700 mb-1.5">Original Price <span class="text-rose-400">*</span></label>
                    <vee-field type="number" name="original_price" id="original-price" v-model="formData.original_price" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Original Price" min="0" required />
                    <ErrorMessage name="original_price" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Sell Price -->
                <div>
                    <label for="sell-price" class="block text-sm font-bold text-gray-700 mb-1.5">Sell Price <span class="text-rose-400">*</span></label>
                    <vee-field type="number" name="sell_price" id="sell-price" v-model="formData.sell_price" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Sell Price" min="0" required />
                    <ErrorMessage name="sell_price" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Stock -->
                <div>
                    <label for="stock" class="block text-sm font-bold text-gray-700 mb-1.5">Stock <span class="text-rose-400">*</span></label>
                    <vee-field type="number" name="stock" id="stock" v-model="formData.stock" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Stock" min="0" required />
                    <ErrorMessage name="stock" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <!-- Description -->
            <div class="mt-5">
                <label for="description" class="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                <vee-field as="textarea" rows="3" name="description" id="description" v-model="formData.description" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Description" required />
                <ErrorMessage name="description" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- File -->
            <div class="mt-5">
                <label for="file" class="block text-sm font-bold text-gray-700 mb-1.5">Product Image <span class="text-rose-400">*</span></label>
                <FilePond 
                    name="file"
                    allow-multiple="false"
                    max-file-size="2MB"
                    accepted-file-types="image/png, image/jpeg"
                    label-idle="Drop files or <span class='filepond--label-action'>Browse</span>"
                    :files="files"
                    @updatefiles="uploadFile"
                />
                <ErrorMessage name="file" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- Submit -->
            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create
            </button>
        </vee-form>
    </div>
</template>
