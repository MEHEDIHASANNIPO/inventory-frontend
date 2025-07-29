<script setup>
/** All Library Import */
import { inject, onMounted, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useExpenseStore } from '@/stores/expense';
import { useRouter } from 'vue-router';
import _ from 'lodash';

/** All Instance */
PageName.value = 'Expense List';
const expenseStore = useExpenseStore();
const router = useRouter();
const swal = inject('$swal')

expenseStore.router = router;
expenseStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')

/** All Methods */

/** Hook & Computed */
onMounted(() => {
    expenseStore.getExpenses(expenseStore.pagination.current_page, expenseStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current) => {
        expenseStore.getExpenses(expenseStore.pagination.current_page, expenseStore.dataLimit, current)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ expenseStore.getTotalCount }}</span></h2>

            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Expenses</h2>

            <router-link v-if="$can('create', 'Expense')" :to="{ name: 'expenseCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
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
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Employee</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Amount</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Category</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Ref</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="( expense, index ) in expenseStore.expenses" :key="expense.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( expenseStore.pagination.current_page * expenseStore.dataLimit ) - expenseStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ new Date(expense.updated_at).toLocaleString() }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ expense.staff?.name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ expense.amount }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ expense.category?.category_name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">
                            <template v-if="expense.file != null">
                                <a :href="expenseStore.getFileUrl + expense.file" download class="text-blue-500 flex items-center justify-center"><font-awesome-icon :icon="['fas', 'download']" /></a>
                            </template>
                        </td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'Expense')" :to="{ name: 'expenseEdit', params: { id: expense.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link >                 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = expenseStore.pagination.current_page
                :pages = expenseStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "expenseStore.getExpenses(expenseStore.pagination.current_page, expenseStore.dataLimit, searchKeyword)"
            />
        </div>
    </div>
</template>
