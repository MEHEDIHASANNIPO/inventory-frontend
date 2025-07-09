<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useCategoryStore } from '@/stores/category';
import { useRouter, useRoute } from 'vue-router';

/** All Instance */
PageName.value = 'Update Category';
const categoryStore = useCategoryStore();
const router = useRouter();
const route = useRoute();
const swal = inject('$swal')

categoryStore.router = router;
categoryStore.swal = swal;

/** All Variables */
const schema = reactive({
  category_name: 'required|max:255',
  category_code: 'required|max:255',
})

/** All Methods */
const UpdateCategory = () => {
    categoryStore.updateCategory(categoryStore.editFormData, route.params.id);
}

onMounted(() => {
    categoryStore.getCategory(route.params.id);
});
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Button -->
        <div v-if="$can('index', 'Category')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'categories' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>
        
        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="UpdateCategory" validate-on-input>
            <!-- Category Name -->
            <div>
                <label for="category-name" class="block text-sm font-bold text-gray-700 mb-1.5">Category Name <span class="text-rose-400">*</span></label>
                <vee-field type="text" name="category_name" id="category-name" v-model="categoryStore.editFormData.category_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Category Name" required />
                <ErrorMessage name="category_name" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <!-- Code -->
            <div class="mt-4">
                <label for="category-code" class="block text-sm font-bold text-gray-700 mb-1.5">Category Code <span class="text-rose-400">*</span> (This is auto-generated. Editing is not allowed.)</label>
                <vee-field type="text" name="category_code" id="category-code" v-model="categoryStore.editFormData.category_code" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Code" required readonly disabled />
                <ErrorMessage name="category_code" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Update
            </button>
        </vee-form>
    </div>
</template>
