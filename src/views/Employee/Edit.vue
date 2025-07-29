<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useEmployeeStore } from '@/stores/employee';
import { useRouter, useRoute } from 'vue-router';

/** All Instance */
PageName.value = 'Update Employee';
const employeeStore = useEmployeeStore();
const router = useRouter();
const route = useRoute();
const swal = inject('$swal');

employeeStore.router = router;
employeeStore.swal = swal;

/** Validation Schema */
const schema = reactive({
    name: 'required|max:255',
    email: 'required|email|max:255',
    phone: 'required|min:7|max:15',
    nid: 'required|max:20',
    address: 'required',
});

/** All Methods */
const UpdateEmployee = () => {
    employeeStore.updateEmployee(employeeStore.editFormData, route.params.id);
};

const onFileChange = (e) => {
    employeeStore.editFormData.file = e.target.files[0];
};

onMounted(() => {
    employeeStore.getEmployee(route.params.id);
});
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Back Button -->
        <div v-if="$can('index', 'Employee')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'employees' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>

        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="UpdateEmployee" validate-on-input enctype="multipart/form-data">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <!-- Name -->
                <div>
                    <label for="name" class="block text-sm font-bold text-gray-700 mb-1.5">Name <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="name" id="name" v-model="employeeStore.editFormData.name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Full Name" required />
                    <ErrorMessage name="name" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-bold text-gray-700 mb-1.5">Email <span class="text-rose-400">*</span></label>
                    <vee-field type="email" name="email" id="email" v-model="employeeStore.editFormData.email" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Email Address" required />
                    <ErrorMessage name="email" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <!-- Phone -->
                <div>
                    <label for="phone" class="block text-sm font-bold text-gray-700 mb-1.5">Phone <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="phone" id="phone" v-model="employeeStore.editFormData.phone" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Phone Number" required />
                    <ErrorMessage name="phone" class="text-xs text-rose-500 font-semibold my-2" />
                </div>

                <!-- NID -->
                <div>
                    <label for="nid" class="block text-sm font-bold text-gray-700 mb-1.5">NID <span class="text-rose-400">*</span></label>
                    <vee-field type="text" name="nid" id="nid" v-model="employeeStore.editFormData.nid" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="National ID" required />
                    <ErrorMessage name="nid" class="text-xs text-rose-500 font-semibold my-2" />
                </div>
            </div>

            <!-- Address -->
            <div class="mt-5">
                <label for="address" class="block text-sm font-bold text-gray-700 mb-1.5">Address <span class="text-rose-400">*</span></label>
                <vee-field as="textarea" rows="3" name="address" id="address" v-model="employeeStore.editFormData.address" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Full Address" required />
                <ErrorMessage name="address" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- File -->
            <div class="mt-5">
                <label for="file" class="block text-sm font-bold text-gray-700 mb-1.5">Upload Attachment (Optional)</label>
                <input type="file" @change="onFileChange" name="file" id="file" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-0 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-700 hover:file:bg-gray-400" />
                <ErrorMessage name="file" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- Submit -->
            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Update
            </button>
        </vee-form>
    </div>
</template>
