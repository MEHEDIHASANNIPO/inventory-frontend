<script setup> 
/** All Library Import */
import { inject, onMounted, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'User List';
const userStore = useUserStore();
const router = useRouter();
const swal = inject('$swal')

userStore.router = router;
userStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')

/** All Methods */
const DeleteUser = (name, id) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            userStore.deleteUser(id, (status) => {
                if(status == 'success') {
                    userStore.getUsers(userStore.pagination.current_page, userStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    userStore.getUsers(userStore.pagination.current_page, userStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current) => {
        userStore.getUsers(userStore.pagination.current_page, userStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ userStore.getTotalCount }}</span></h2>

            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Users</h2>

            <router-link v-if="$can('create', 'User')" :to="{ name: 'userCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
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
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Email</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Phone</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">NID</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Role</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Ref</th>
                        <th v-if="$can('edit', 'User')" class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Status</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="( user, index ) in userStore.users" :key="user.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( userStore.pagination.current_page * userStore.dataLimit ) - userStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(user.updated_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ user.name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ user.email }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ user.phone }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ user.nid }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ user.role?.role_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <template v-if="user.file != null">
                                <a :href="userStore.getFileUrl + user.file" download class="text-blue-500 flex items-center justify-center"><font-awesome-icon :icon="['fas', 'download']" /></a>
                            </template>
                        </td>
                        <td v-if="$can('edit', 'User')" class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" @change.prevent="userStore.changeStatus(user.id)" :checked="user.is_active">
                                <div class="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-mainColor rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mainColor"></div>
                            </label>                                  
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'User')" :to="{ name: 'userEdit', params: { id: user.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link >                             
                            <a v-if="$can('delete', 'User')" href="javascript:void(0)" @click.prevent="DeleteUser(user.name, user.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = userStore.pagination.current_page
                :pages = userStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "userStore.getUsers(userStore.pagination.current_page, userStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>
