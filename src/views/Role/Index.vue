<script setup>
/** All Library Import */
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useRoleStore } from '@/stores/role';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Role List';
const roleStore = useRoleStore();
const router = useRouter();
const swal = inject('$swal')

roleStore.router = router;
roleStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')

/** All Methods */
const DeleteRole = (name, id) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            roleStore.deleteRole(id, (status) => {
                if(status == 'success') {
                    roleStore.getRoles(roleStore.pagination.current_page, roleStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    roleStore.getRoles(roleStore.pagination.current_page, roleStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current, prevoius) => {
        roleStore.getRoles(roleStore.pagination.current_page, roleStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="taxt-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ roleStore.getTotalCount }}</span></h2>

            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="taxt-md font-medium">All Roles</h2>

            <router-link v-if="$can('create', 'Role')" :to="{ name: 'roleCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create New
            </router-link>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Last Updated</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Role Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Note</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Permissions</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="( role, index ) in roleStore.roles" :key="role.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( roleStore.pagination.current_page * roleStore.dataLimit ) - roleStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(role.updated_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ role.role_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ role.role_note }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <div class="flex flex-wrap items-start gap-1 5">
                                <span class="rounded bg-mainColor px-2 py-0.5 text-xs font-semibold text-white" v-for="(permission, index) in role.permissions" :key="permission.id">{{ permission.permission_name }}</span>
                            </div>
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'Role')" :to="{ name: 'roleEdit', params: { id: role.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link >                             
                            <a v-if="$can('delete', 'Role')" v-show="role.is_deleteable" href="javascript:void(0)" @click.prevent="DeleteRole(role.role_name, role.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

         <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = roleStore.pagination.current_page
                :pages = roleStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "roleStore.getRoles(roleStore.pagination.current_page, roleStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>
