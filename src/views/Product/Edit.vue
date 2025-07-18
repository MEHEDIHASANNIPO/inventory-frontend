<script setup>
/** All Library Import */
import { inject, onMounted, reactive, ref } from 'vue';
import { PageName } from '@/components/PageName';
import { useProductStore } from '@/stores/product';
import { useCategoryStore } from '@/stores/category';
import { useBrandStore } from '@/stores/brand';
import { useSupplierStore } from '@/stores/supplier';
import { useWarehouseStore } from '@/stores/warehouse';
import { useRouter, useRoute } from 'vue-router';

/** All Instance */
PageName.value = 'Update Product';
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const brandStore = useBrandStore();
const supplierStore = useSupplierStore();
const warehouseStore = useWarehouseStore();
const router = useRouter();
const route = useRoute();
const swal = inject('$swal');

productStore.router = router;
productStore.swal = swal;

/** Validation Schema */
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

/** All Methods */
const UpdateProduct = () => {
  productStore.updateProduct(productStore.editFormData, route.params.id);
};


/** Mounted */
onMounted(() => {
  categoryStore.getAllCategories();
  brandStore.getAllBrands();
  supplierStore.getAllSuppliers();
  warehouseStore.getAllWareHouses();
  productStore.getProduct(route.params.id);
});
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
    <vee-form :validation-schema="schema" @submit="UpdateProduct" validate-on-input enctype="multipart/form-data">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-bold text-gray-700 mb-1.5">Category <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="category_id" id="category" v-model="productStore.editFormData.category_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
            <option value="">Select A Category</option>
            <option v-for="item in categoryStore.categories" :key="item.id" :value="item.id">{{ item.category_name }}</option>
          </vee-field>
          <ErrorMessage name="category_id" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Brand -->
        <div>
          <label for="brand" class="block text-sm font-bold text-gray-700 mb-1.5">Brand <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="brand_id" id="brand" v-model="productStore.editFormData.brand_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
            <option value="">Select A Brand</option>
            <option v-for="item in brandStore.brands" :key="item.id" :value="item.id">{{ item.brand_name }}</option>
          </vee-field>
          <ErrorMessage name="brand_id" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Supplier -->
        <div>
          <label for="supplier" class="block text-sm font-bold text-gray-700 mb-1.5">Supplier <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="supplier_id" id="supplier" v-model="productStore.editFormData.supplier_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
            <option value="">Select A Supplier</option>
            <option v-for="item in supplierStore.suppliers" :key="item.id" :value="item.id">{{ item.name }}</option>
          </vee-field>
          <ErrorMessage name="supplier_id" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Warehouse -->
        <div>
          <label for="warehouse" class="block text-sm font-bold text-gray-700 mb-1.5">Warehouse <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="warehouse_id" id="warehouse" v-model="productStore.editFormData.warehouse_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-1 focus:outline-mainColor">
            <option value="">Select A Warehouse</option>
            <option v-for="item in warehouseStore.warehouses" :key="item.id" :value="item.id">{{ item.warehouse_name }}</option>
          </vee-field>
          <ErrorMessage name="warehouse_id" class="text-xs text-rose-500 font-semibold my-2" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <!-- Product Name -->
        <div class="">
            <label for="product-name" class="block text-sm font-bold text-gray-700 mb-1.5">Product Name <span class="text-rose-400">*</span></label>
            <vee-field type="text" name="product_name" id="product-name" v-model="productStore.editFormData.product_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Product Name" required />
            <ErrorMessage name="product_name" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Product Code -->
        <div class="">
            <label for="product-code" class="block text-sm font-bold text-gray-700 mb-1.5">Product Code <span class="text-rose-400">*</span> (This is auto-generated. Editing is not allowed.)</label>
            <vee-field type="text" name="product_code" id="product-code" v-model="productStore.editFormData.product_code" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm"  readonly disabled />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        <!-- Original Price -->
        <div>
          <label for="original_price" class="block text-sm font-bold text-gray-700 mb-1.5">Original Price <span class="text-rose-400">*</span></label>
          <vee-field type="number" name="original_price" id="original_price" v-model="productStore.editFormData.original_price" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Original Price" min="0" required />
          <ErrorMessage name="original_price" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Sell Price -->
        <div>
          <label for="sell_price" class="block text-sm font-bold text-gray-700 mb-1.5">Sell Price <span class="text-rose-400">*</span></label>
          <vee-field type="number" name="sell_price" id="sell_price" v-model="productStore.editFormData.sell_price" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Sell Price" min="0" required />
          <ErrorMessage name="sell_price" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Stock -->
        <div>
          <label for="stock" class="block text-sm font-bold text-gray-700 mb-1.5">Stock <span class="text-rose-400">*</span></label>
          <vee-field type="number" name="stock" id="stock" v-model="productStore.editFormData.stock" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Stock" min="0" required />
          <ErrorMessage name="stock" class="text-xs text-rose-500 font-semibold my-2" />
        </div>
      </div>

      <!-- Description -->
      <div class="mt-5">
        <label for="description" class="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
        <vee-field as="textarea" rows="3" name="description" id="description" v-model="productStore.editFormData.description" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Description" required />
        <ErrorMessage name="description" class="text-xs text-rose-500 font-semibold my-2" />
      </div>

      <!-- File -->
      <div class="mt-5">
        <label for="file" class="block text-sm font-bold text-gray-700 mb-1.5">Product Image</label>
        <FilePond 
          name="file"
          allow-multiple="false"
          max-file-size="2MB"
          accepted-file-types="image/png, image/jpeg"
          label-idle="Drop files or <span class='filepond--label-action'>Browse</span>"
          :files="productStore.files"
          @updatefiles="productStore.uploadFile"
        />

        <img :src="productStore.getFileUrl + productStore.image" class="w-48 h-48" alt="" v-show="productStore.image">
        <ErrorMessage name="file" class="text-xs text-rose-500 font-semibold my-2" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div class="">
            <label for="barcode" class="block text-sm font-bold text-gray-700 mb-1.5">Product BarCode</label>
            <img :src="productStore.getFileUrl + productStore.editFormData.barcode" alt="">
        </div>
        <div class="">
            <label for="qrcode" class="block text-sm font-bold text-gray-700 mb-1.5">Product QrCode</label>
            <img :src="productStore.getFileUrl + productStore.editFormData.qrcode" alt="" class="w-28 h-28">
        </div>
      </div>

      <!-- Submit -->
      <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
        Update
      </button>
    </vee-form>
  </div>
</template>
