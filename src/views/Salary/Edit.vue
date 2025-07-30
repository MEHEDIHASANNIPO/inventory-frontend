<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue'
import { PageName } from '@/components/PageName'
import { useSalarystore } from '@/stores/salary'
import { useEmployeeStore } from '@/stores/employee'
import { useRouter, useRoute } from 'vue-router'
import { getMonths, getYears } from '@/helpers/helper'

/** All Instance */
PageName.value = 'Edit Salary'
const salaryStore = useSalarystore()
const employeeStore = useEmployeeStore()
const router = useRouter()
const route = useRoute()
const swal = inject('$swal')

salaryStore.router = router
salaryStore.swal = swal

/** All Variables */
const schema = reactive({
 staff_id: 'required',
  amount: 'required|min:1|min_value:1',
  date: 'required',
  month: 'required',
  year: 'required',
  type: 'required',
})

/** All Methods */
const UpdateSalary = () => {
  salaryStore.updateSalary(salaryStore.editFormData, route.params.id)
}

/** Hook */
onMounted(() => {
  salaryStore.getSalary(route.params.id)
  employeeStore.getAllEmployees()
})
</script>

<template>
  <div class="bg-white rounded-lg p-5 shadow-md">
    <!-- Button -->
    <div v-if="$can('index', 'Salary')" class="flex justify-end mb-4">
      <router-link :to="{ name: 'salaries' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
        Back To List
      </router-link>
    </div>

    <!-- Form -->
    <vee-form :validation-schema="schema" @submit="UpdateSalary" validate-on-input enctype="multipart/form-data">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Salary Date -->
        <div>
          <label for="salary-date" class="block text-sm font-bold text-gray-700 mb-1.5">Salary Date <span class="text-rose-400">*</span></label>
          <vee-field type="date" name="date" id="salary-date" v-model="salaryStore.editFormData.date" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor cursor-pointer"></vee-field>
          <ErrorMessage name="date" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Salary Month -->
        <div>
          <label for="salary-month" class="block text-sm font-bold text-gray-700 mb-1.5">Salary Month <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="month" id="salary-month" v-model="salaryStore.editFormData.month" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor cursor-pointer">
            <option value="">Select a Month</option>
            <option v-for="(month, index) in getMonths()" :key="index" :value="month">
                {{ month }}
            </option>
          </vee-field>
          <ErrorMessage name="month" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Salary Year -->
        <div>
          <label for="salary-year" class="block text-sm font-bold text-gray-700 mb-1.5">Salary Year <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="year" id="salary-year" v-model="salaryStore.editFormData.year" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor cursor-pointer">
            <option value="">Select a Year</option>
            <option v-for="(year, index) in getYears(2010)" :key="index" :value="year">
                {{ year }}
            </option>
          </vee-field>
          <ErrorMessage name="year" class="text-xs text-rose-500 font-semibold my-2" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
        <!-- Employee Name -->
        <div>
          <label for="employee-name" class="block text-sm font-bold text-gray-700 mb-1.5">Employee <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="staff_id" id="employee-name" v-model="salaryStore.editFormData.staff_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor cursor-pointer">
            <option value="">Select Employee</option>
            <option v-for="employee in employeeStore.employees" :key="employee.id" :value="employee.id">
                {{ employee.name }}
            </option>
          </vee-field>
          <ErrorMessage name="staff_id" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Amount -->
        <div>
          <label for="amount" class="block text-sm font-bold text-gray-700 mb-1.5">Amount <span class="text-rose-400">*</span></label>
          <vee-field type="number" name="amount" id="amount" v-model="salaryStore.editFormData.amount" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Amount" min="0" required />
          <ErrorMessage name="amount" class="text-xs text-rose-500 font-semibold my-2" />
        </div>
      </div>

      <!-- Salary Type -->
      <div>
        <label for="salary-type" class="block text-sm font-bold text-gray-700 mb-1.5">Salary Type <span class="text-rose-400">*</span></label>
        <vee-field as="select" name="type" id="salary-type" v-model="salaryStore.editFormData.type" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor cursor-pointer">
          <option value="">Select a Type</option>
          <option v-for="(type, index) in salaryStore.salaryTypes" :key="index" :value="type">
              {{ type }}
          </option>
        </vee-field>
        <ErrorMessage name="type" class="text-xs text-rose-500 font-semibold my-2" />
      </div>

      <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
        Update
      </button>
    </vee-form>
  </div>
</template>
