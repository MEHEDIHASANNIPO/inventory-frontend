<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue';
import { PageName } from '@/components/PageName';
import { useExpenseCategoryStore } from '@/stores/expensecategory';
import { useRouter, useRoute } from 'vue-router';

/** All Instance */
PageName.value = 'Update Expense Category';
const expenseCategoryStore = useExpenseCategoryStore();
const router = useRouter();
const route = useRoute();
const swal = inject('$swal')

expenseCategoryStore.router = router;
expenseCategoryStore.swal = swal;

/** All Variables */
const schema = reactive({
  category_name: 'required|max:255',
})

/** All Methods */
const UpdateExpenseCategory = () => {
    expenseCategoryStore.updateExpenseCategory(expenseCategoryStore.editFormData, route.params.id);
}

onMounted(() => {
    expenseCategoryStore.getExpenseCategory(route.params.id);
});
</script>

<template>
    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Button -->
        <div v-if="$can('index', 'ExpenseCategory')" class="flex justify-end mb-4">
            <router-link :to="{ name: 'expenseCategories' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Back To List
            </router-link>
        </div>
        
        <!-- Form -->
        <vee-form :validation-schema="schema" @submit="UpdateExpenseCategory" validate-on-input>
            <!-- Expense Category Name -->
            <div>
                <label for="category-name" class="block text-sm font-bold text-gray-700 mb-1.5">Expense Category Name <span class="text-rose-400">*</span></label>
                <vee-field type="text" name="category_name" id="category-name" v-model="expenseCategoryStore.editFormData.category_name" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Expense Category Name" required />
                <ErrorMessage name="category_name" class="text-xs text-rose-500 font-semibold my-2" />
            </div>

            <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Update
            </button>
        </vee-form>
    </div>
</template>
