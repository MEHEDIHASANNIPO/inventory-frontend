<script setup>
/** All Library Import */
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { PageName } from '@/components/PageName';
import { useSalarystore } from '@/stores/salary';
import { useRouter } from 'vue-router';
import { getMonths, getYears } from '@/helpers/helper'
import _ from 'lodash';

/** All Instance */
PageName.value = 'Salary List';
const salaryStore = useSalarystore();
const router = useRouter();
const swal = inject('$swal')

salaryStore.router = router;
salaryStore.swal = swal;

/** All Variables */
const searchKeyword = ref('')
const filterFormData = reactive({
    date: null,
    month: '',
    year: '',
    type: '',
})

/** All Methods */
const DeleteSalary = (name, id) => {
    swal({
        title: `Do you want to delete this data: ${name}`,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete It!'
    }).then((result) => {
        if(result.isConfirmed) {
            salaryStore.deleteSalary(id, (status) => {
                if(status == 'success') {
                    salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit)
                }
            })
        }
    })
}

/** Hook & Computed */
onMounted(() => {
    salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit);
})

watch(
    searchKeyword,
    _.debounce((current) => {
        salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit, current, filterFormData)
    }, 500)
)
</script>

<template>
    <!-- Statistics & Search -->
    <div class="bg-white rounded-lg p-5 shadow-md mb-6">
        <div class="flex justify-between items-center gap-5">
            <h2 class="text-md font-medium">Total Count: <span class="text-mainColor font-bold">{{ salaryStore.getTotalCount }}</span></h2>

            <!-- Search -->
            <input type="search" placeholder="Search..." v-model="searchKeyword" class="py-2 px-3 border border-gray-200 rounded-md focus:outline-mainColor max-w-40 md:min-w-80">
        </div>

        <!-- Filter -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
            <!-- Filter By Date -->
            <input type="date" name="date" v-model="filterFormData.date" @change="salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer" />

            <!-- Filter By Month -->
            <select name="month" v-model="filterFormData.month" @change="salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                <option value="">Filter by Month</option>
                <option v-for="(month, index) in getMonths()" :key="index" :value="month">
                    {{ month }}
                </option>
            </select>

            <!-- Filter By Year -->
            <select name="year" v-model="filterFormData.year" @change="salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                <option value="">Filter by Year</option>
                <option v-for="(year, index) in getYears(2010)" :key="index" :value="year">
                    {{ year }}
                </option>
            </select>

            <!-- Filter By Type -->
                <select name="type" v-model="filterFormData.type" @change="salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit, searchKeyword, filterFormData)" class="block w-full p-2.5 rounded-md border border-gray-200 focus:outline-1 focus:outline-mainColor cursor-pointer">
                <option value="">Filter by Type</option>
                <option v-for="(type, index) in salaryStore.salaryTypes" :key="index" :value="type">
                    {{ type }}
                </option>
            </select>
        </div>
    </div>

    <div class="bg-white rounded-lg p-5 shadow-md">
        <!-- Head -->
        <div class="flex justify-between items-center gap-5 mb-6">
            <h2 class="text-md font-medium">All Salaries</h2>

            <router-link v-if="$can('create', 'Salary')" :to="{ name: 'salaryCreate' }" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
                Create New
            </router-link>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto md:overflow-hidden">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">#</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Employee</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Amount</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Type</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Date</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Month</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Year</th>
                        <th class="border border-gray-200 py-2.5 px-4 md:px-2.5 text-base font-semibold font-outfit text-left">Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="( salary, index ) in salaryStore.salaries" :key="salary.id">
                        <td class="border border-gray-200 py-3 px-4 md:px-2.5 text-sm font-medium">{{ ( salaryStore.pagination.current_page * salaryStore.dataLimit ) - salaryStore.dataLimit + index + 1 }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ salary.staff?.name }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ salary.amount }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ salary.type }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ salary.date }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ salary.month }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700">{{ salary.year }}</td>
                        <td class="border border-gray-200 p-3 text-sm font-medium text-gray-700 flex flex-col items-start lg:items-stretch lg:flex-row gap-1">
                            <router-link v-if="$can('edit', 'Salary')" :to="{ name: 'salaryEdit', params: { id: salary.id } }" class="bg-mainColor rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></router-link > 
                            <a v-if="$can('delete', 'Salary')" href="javascript:void(0)" @click.prevent="DeleteSalary(salary.staff?.name, salary.id)" class="bg-rose-600 rounded-md text-sm text-white font-medium p-2 transition duration-300 hover:opacity-70 hover:text-white flex items-center gap-1">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </a>                
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-end">
            <v-pagination 
                v-model = salaryStore.pagination.current_page
                :pages = salaryStore.pagination.last_page
                :range-size = 1
                active-color="#DCEDFF"
                @update:modelValue = "salaryStore.getSalaries(salaryStore.pagination.current_page, salaryStore.dataLimit, searchKeyword, filterFormData)"
            />
        </div>
    </div>
</template>
