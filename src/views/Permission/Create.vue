<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useModuleStore } from '@/stores/module';
import { usePermissionStore } from '@/stores/permission';
import { useRouter } from 'vue-router';

/** All Instance */
PageName.value = 'Create Permission';
const moduleStore = useModuleStore();
const permissionStore = usePermissionStore();
const router = useRouter();
const swal = inject('$swal')

permissionStore.router = router;
permissionStore.swal = swal;

/** All Variables */
const formData = reactive({
    module_id: null,
    permission_name: null,
})

const schema = reactive({
  module_id: 'required',
  permission_name: 'required|max:255',
})

/** All Methods */
const StorePermission = () => {
    permissionStore.storePermission(formData);
}

/** Hooks */
onMounted(() => {
    moduleStore.getAllModules();
})
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Button -->
        <div v-if="$can('index', 'Permission')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'permissions' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>

        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="StorePermission" validate-on-input>
            <!-- Module Name -->
            <div>
                <label for="module-name" class="block text-sm font-bold text-gray-700 mb-1.5">Module Name <span class="text-rose-400">*</span></label>
                <vee-field as="select" name="module_id" id="module-name" v-model="formData.module_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-white cursor-pointer focus:outline-1 focus:outline-mainColor">
                    <option value="">Select A Module</option>
                    <option v-for="module in moduleStore.modules" :key="module.id" :value="module.id">
                        {{ module.module_name }}
                    </option>
                </vee-field>
                <ErrorMessage name="module_id" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- Permission Name -->
            <div class="mt-4">
                <label for="permission-name" class="block text-sm font-bold text-gray-700 mb-1.5">Permission Name <span class="text-rose-400">*</span></label>
                <vee-field type="text" name="permission_name" id="permission-name" v-model="formData.permission_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-white focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Permission Name" required />
                <ErrorMessage name="permission_name" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create
            </button>
        </vee-form>
    </div>
</template>
