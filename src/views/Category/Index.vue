<script setup>
/** All Library Import */
import { inject, onMounted, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useCategoryStore } from '@/stores/category';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Category List';
const categoryStore = useCategoryStore();
const router = useRouter();
const swal = inject('$swal')

categoryStore.router = router;
categoryStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')

/** All Methods */
const DeleteCategory = (name, id) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            categoryStore.deleteCategory(id, (status) => {
                if(status == 'success') {
                    categoryStore.getCategories(categoryStore.pagination.current_page, categoryStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    categoryStore.getCategories(categoryStore.pagination.current_page, categoryStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current) => {
        categoryStore.getCategories(categoryStore.pagination.current_page, categoryStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ categoryStore.getTotalCount }}</span></h2>

            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Categories</h2>

            <router-link v-if="$can('create', 'Category')" :to="{ name: 'categoryCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
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
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Category Name</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Code</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Status</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="( category, index ) in categoryStore.categories" :key="category.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( categoryStore.pagination.current_page * categoryStore.dataLimit ) - categoryStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(category.updated_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ category.category_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ category.category_code }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" @change.prevent="categoryStore.changeStatus(category.id)" :checked="category.is_active">
                                <div class="w-9 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-mainColor rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mainColor"></div>
                            </label>                                  
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'Category')" :to="{ name: 'categoryEdit', params: { id: category.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link >                             
                            <a v-if="$can('delete', 'Category')" href="javascript:void(0)" @click.prevent="DeleteCategory(category.category_name, category.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'trash']" /></a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = categoryStore.pagination.current_page
                :pages = categoryStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "categoryStore.getCategories(categoryStore.pagination.current_page, categoryStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>
