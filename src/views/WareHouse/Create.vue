<script setup>
/** All Library Import */
import { inject, reactive } from 'vue'
import { PageName } from '@/components/PageName'
import { useWarehouseStore } from '@/stores/warehouse'
import { useRouter } from 'vue-router'

/** All Instance */
PageName.value = 'Create WareHouse'
const warehouseStore = useWarehouseStore()
const router = useRouter()
const swal = inject('$swal')

warehouseStore.router = router
warehouseStore.swal = swal

/** All Variables */
const formData = reactive({
  warehouse_name: null,
  warehouse_address: null,
  warehouse_zipcode: null,
  warehouse_phone: null
})

const schema = reactive({
  warehouse_name: 'required|max:255',
  warehouse_address: 'required',
  warehouse_zipcode: 'required|min:4|max:10',
  warehouse_phone: 'required|min:7|max:15'
})

/** All Methods */
const StoreWareHouse = () => {
  warehouseStore.storeWareHouse(formData)
}
</script>

<template>
  <div class="bg-white rounded-lg p-5 shadow-md">
    <!-- Button -->
    <div v-if="$can('index', 'Warehouse')" class="flex justify-end mb-4">
      <router-link :to="{ name: 'warehouses' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
        Back To List
      </router-link>
    </div>

    <!-- Form -->
    <vee-form :validation-schema="schema" @submit="StoreWareHouse" validate-on-input>
      <!-- WareHouse Name-->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label for="warehouse-name" class="block text-sm font-bold text-gray-700 mb-1.5">WareHouse Name <span class="text-rose-400">*</span></label>
          <vee-field type="text" name="warehouse_name" id="warehouse-name" v-model="formData.warehouse_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="WareHouse Name" required />
          <ErrorMessage name="warehouse_name" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- WareHouse Phone -->
        <div>
          <label for="warehouse-phone" class="block text-sm font-bold text-gray-700 mb-1.5">Phone <span class="text-rose-400">*</span></label>
          <vee-field type="text" name="warehouse_phone" id="warehouse-phone" v-model="formData.warehouse_phone" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Phone" required />
          <ErrorMessage name="warehouse_phone" class="text-xs text-rose-500 font-semibold my-2" />
        </div>
      </div>

      <!-- WareHouse Address -->
      <div class="my-5">
        <label for="warehouse-address" class="block text-sm font-bold text-gray-700 mb-1.5">Address <span class="text-rose-400">*</span></label>
        <vee-field as="textarea" name="warehouse_address" id="warehouse-address" rows="3" v-model="formData.warehouse_address" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="WareHouse Address" required />
        <ErrorMessage name="warehouse_address" class="text-xs text-rose-500 font-semibold my-2" />
      </div>

      <!-- WareHouse Zipcode -->
      <div>
        <label for="warehouse-zipcode" class="block text-sm font-bold text-gray-700 mb-1.5">Zipcode <span class="text-rose-400">*</span></label>
        <vee-field type="text" name="warehouse_zipcode" id="warehouse-zipcode" v-model="formData.warehouse_zipcode" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="WareHouse Zipcode" required />
        <ErrorMessage name="warehouse_zipcode" class="text-xs text-rose-500 font-semibold my-2" />
      </div>

      <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
        Create
      </button>
    </vee-form>
  </div>
</template>
