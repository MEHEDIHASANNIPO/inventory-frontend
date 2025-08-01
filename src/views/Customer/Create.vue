<script setup>
/** All Library Import */
import { inject, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useCustomerStore } from '@/stores/customer';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'Create Customer';
const customerStore = useCustomerStore();
const router = useRouter();
const swal = inject('$swal')

customerStore.router = router;
customerStore.swal = swal;

/** All Variables */
const formData = reactive({
    name: null,
    email: null,
    phone: null,
    file: null
});

const schema = reactive({
    name: 'required|max:255',
    email: 'email|max:255',
    phone: 'required|min:7|max:15',
});

const files = [];

/** All Methods */
const StoreCustomer = () => {
    customerStore.storeCustomer(formData);
};
const uploadFile = (fileItems) => {
    files.value = fileItems;
    formData.file = fileItems.length ? fileItems[0].file : null;
};

</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Back Button -->
        <div v-if="$can('index', 'Customer')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'customers' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>

        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="StoreCustomer" validate-on-input enctype="multipart/form-data">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-bold text-gray-700 mb-1.5">Name <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="name" id="name" v-model="formData.name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Full Name" required />
                    <ErrorMessage name="name" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
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

            <!-- File -->
            <div class="mt-5">
                <label for="file" class="block text-sm font-bold text-gray-700 mb-1.5">Image (optional)</label>
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
