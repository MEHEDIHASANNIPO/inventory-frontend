<script setup>
/** All Library Import */
import { inject, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useSupplierStore } from '@/stores/supplier';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'Create Supplier';
const supplierStore = useSupplierStore();
const router = useRouter();
const swal = inject('$swal')

supplierStore.router = router;
supplierStore.swal = swal;

/** All Variables */
const formData = reactive({
    name: null,
    email: null,
    phone: null,
    nid: null,
    company_name: null,
    address: null,
    file: null
});

const schema = reactive({
    name: 'required|max:255',
    email: 'required|email|max:255',
    phone: 'required|min:7|max:15',
    nid: 'required|max:20',
    company_name: 'required|max:255',
    address: 'required',
});

/** All Methods */
const StoreSupplier = () => {
    supplierStore.storeSupplier(formData);
};
const onFileChange = (e) => {
    formData.file = e.target.files[0];
}
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Back Button -->
        <div v-if="$can('index', 'Supplier')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'suppliers' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>

        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="StoreSupplier" validate-on-input enctype="multipart/form-data">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-bold text-gray-700 mb-1.5">Name <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="name" id="name" v-model="formData.name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Full Name" required />
                    <ErrorMessage name="name" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-bold text-gray-700 mb-1.5">Email <span class="text-rose-400">*</span></label>
                    <vee-field type="email" name="email" id="email" v-model="formData.email" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Email Address" required />
                    <ErrorMessage name="email" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Phone -->
                <div>
                    <label for="phone" class="block text-sm font-bold text-gray-700 mb-1.5">Phone <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="phone" id="phone" v-model="formData.phone" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Phone Number" required />
                    <ErrorMessage name="phone" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <!-- NID -->
                <div>
                    <label for="nid" class="block text-sm font-bold text-gray-700 mb-1.5">NID <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="nid" id="nid" v-model="formData.nid" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="National ID" required />
                    <ErrorMessage name="nid" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Company Name -->
                <div>
                    <label for="company_name" class="block text-sm font-bold text-gray-700 mb-1.5">Company Name <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="company_name" id="company_name" v-model="formData.company_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Company Name" required />
                    <ErrorMessage name="company_name" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <!-- Address -->
            <div class="mt-5">
                <label for="address" class="block text-sm font-bold text-gray-700 mb-1.5">Address <span class="text-rose-400">*</span></label>
                <vee-field as="textarea" rows="3" name="address" id="address" v-model="formData.address" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Full Address" required />
                <ErrorMessage name="address" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- File -->
            <div class="mt-5">
                <label for="file" class="block text-sm font-bold text-gray-700 mb-1.5">Upload Attachment <span class="text-rose-400">*</span></label>
                <input type="file" @change="onFileChange" name="file" id="file" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-0 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-700 hover:file:bg-gray-400" />
                <ErrorMessage name="file" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- Submit -->
            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create
            </button>
        </vee-form>
    </div>
</template>
