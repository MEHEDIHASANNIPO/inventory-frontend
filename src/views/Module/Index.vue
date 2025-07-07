<script setup>
/** All Library Import */
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useModuleStore } from '@/stores/module';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Module List';
const moduleStore = useModuleStore();
const router = useRouter();
const swal = inject('$swal')

moduleStore.router = router;
moduleStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')

/** All Methods */
const DeleteModule = (name, id) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            moduleStore.deleteModule(id, (status) => {
                if(status == 'success') {
                    moduleStore.getModules(moduleStore.pagination.current_page, moduleStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    moduleStore.getModules(moduleStore.pagination.current_page, moduleStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current, prevoius) => {
        moduleStore.getModules(moduleStore.pagination.current_page, moduleStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ moduleStore.getTotalCount }}</span></h2>

            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Modules</h2>

            <router-link v-if="$can('create', 'Module')" :to="{ name: 'moduleCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
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
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Module Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Module Slug</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="( module, index ) in moduleStore.modules" :key="module.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( moduleStore.pagination.current_page * moduleStore.dataLimit ) - moduleStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(module.updated_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ module.module_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ module.module_slug }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'Module')" :to="{ name: 'moduleEdit', params: { id: module.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link >                             
                            <a v-if="$can('delete', 'Module')" href="javascript:void(0)" @click.prevent="DeleteModule(module.module_name, module.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

         <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = moduleStore.pagination.current_page
                :pages = moduleStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "moduleStore.getModules(moduleStore.pagination.current_page, moduleStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>