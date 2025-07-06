<script setup>
/** All Library Import */
import { inject, onMounted, reactive, ref } from 'vue';
import { PageName } from '@/components/PageName';
import { useRoleStore } from '@/stores/role';
import { useModuleStore } from '@/stores/module';
import { useRouter, useRoute } from 'vue-router';

/** All Instance */
PageName.value = 'Edit Role';
const roleStore = useRoleStore();
const moduleStore = useModuleStore();
const router = useRouter();
const route = useRoute();
const swal = inject('$swal')

roleStore.router = router;
roleStore.swal = swal;

/** All Variables */
const allPermission = ref(true);

const schema = reactive({
  role_name: 'required|max:255',
  role_note: 'max:255',
})

/** All Methods */
const UpdateRole = () => {
    roleStore.updateRole(roleStore.editFormData, route.params.id);
}
const selectAllPermission = () => {
    allPermission.value = !allPermission.value

    if (allPermission.value) {
        const allIds = []
        moduleStore.modules.forEach(module => {
        module.permissions.forEach(permission => {
            allIds.push(permission.id)
        })
        })
        roleStore.editFormData.permissions = allIds
    } else {
        roleStore.editFormData.permissions = []
    }
}

/** Hook & Method */
onMounted(() => {
    roleStore.getRole(route.params.id);
    moduleStore.getAllModules();
})
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Button -->
        <div class="flex justify-end mb-4">
            <router-link :to="{ name: 'roles' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>
        
        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="UpdateRole" validate-on-input>
            <!-- Role Name -->
            <div>
                <label for="role-name" class="block text-sm font-bold text-gray-700 mb-1.5">Role Name <span class="text-rose-400">*</span></label>
                <vee-field type="text" name="role_name" id="role-name" v-model="roleStore.editFormData.role_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Role Name" required />
                <ErrorMessage name="role_name" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- Role Note -->
            <div class="mt-4">
                <label for="role-note" class="block text-sm font-bold text-gray-700 mb-1.5">Role Note</label>
                <vee-field type="text" name="role_note" id="role-note" v-model="roleStore.editFormData.role_note" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Role Note" />
                <ErrorMessage name="role_note" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- Permissions -->
            <div class="mt-4">
                <label for="permissions" class="block text-sm font-bold text-gray-700 mb-1.5">Permissions <span class="text-rose-400">*</span></label>
                <div class="flex items-center mb-4">
                    <input id="select-all" type="checkbox" @change="selectAllPermission" class="w-4 h-4 text-white bg-gray-100 accent-mainColor border-gray-300 rounded focus:outline-0 focus:ring-2 focus:ring-mainColor" :checked="allPermission" />

                    <label for="select-all" class="ml-2 text-sm text-gray-700 font-medium cursor-pointer">Select All</label>
                </div>
            </div>

            <!-- Permissions List -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
                <div class="" v-for="(module, index) in moduleStore.modules" :key="module.id">
                    <h2 class="text-mainColor text-lg font-semibold mb-2.5">{{ module.module_name }}</h2>

                    <div class="flex items-center mb-4" v-for="(permission, index) in module.permissions" :key="permission.id">
                        <input :id="'permission-' + permission.id" type="checkbox" name="permissions[]" v-model="roleStore.editFormData.permissions" :value="permission.id" class="w-4 h-4 text-white bg-gray-100 accent-mainColor border-gray-300 rounded focus:outline-0 focus:ring-2 focus:ring-mainColor" />

                        <label :for="'permission-' + permission.id" class="ml-2 text-sm text-gray-700 font-medium cursor-pointer">{{ permission.permission_name }}</label>
                    </div>
                </div>
            </div>


            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Update
            </button>
        </vee-form>
    </div>
</template>
