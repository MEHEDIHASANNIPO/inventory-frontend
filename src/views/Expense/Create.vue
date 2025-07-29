<script setup>
/** All Library Import */
import { inject, onMounted, reactive } from 'vue'
import { PageName } from '@/components/PageName'
import { useExpenseStore } from '@/stores/expense'
import { useExpenseCategoryStore } from '@/stores/expensecategory'
import { useEmployeeStore } from '@/stores/employee'
import { useRouter } from 'vue-router'

/** All Instance */
PageName.value = 'Create Expense'
const expenseStore = useExpenseStore()
const expenseCategoryStore = useExpenseCategoryStore()
const employeeStore = useEmployeeStore()
const router = useRouter()
const swal = inject('$swal')

expenseStore.router = router
expenseStore.swal = swal

/** All Variables */
const formData = reactive({
  expense_category_id: null,
  staff_id: null,
  amount: 0,
  note: null,
  file: null
})

const schema = reactive({
  expense_category_id: 'required',
  staff_id: 'required',
  amount: 'required|min:1|min_value:1',
  note: 'required'
})

/** All Methods */
const StoreExpense = () => {
  expenseStore.storeExpense(formData)
}
const onFileChange = (e) => {
  formData.file = e.target.files[0];
  console.log(formData.file)
}

/** Hook & Computed */
onMounted(() => {
  expenseCategoryStore.getAllExpenseCategories()
  employeeStore.getAllEmployees()
})
</script>

<template>
  <div class="bg-white rounded-lg p-5 shadow-md">
    <!-- Button -->
    <div v-if="$can('index', 'Expense')" class="flex justify-end mb-4">
      <router-link :to="{ name: 'expenses' }" class="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
        Back To List
      </router-link>
    </div>

    <!-- Form -->
    <vee-form :validation-schema="schema" @submit="StoreExpense" validate-on-input enctype="multipart/form-data">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Category Name -->
        <div>
          <label for="expense-category" class="block text-sm font-bold text-gray-700 mb-1.5">Expense Category <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="expense_category_id" id="expense-category" v-model="formData.expense_category_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor cursor-pointer">
            <option value="">Select Category</option>
            <option v-for="category in expenseCategoryStore.categories" :key="category.id" :value="category.id">
                {{ category.category_name }}
            </option>
          </vee-field>
          <ErrorMessage name="expense_category_id" class="text-xs text-rose-500 font-semibold my-2" />
        </div>

        <!-- Employee Name -->
        <div>
          <label for="employee-name" class="block text-sm font-bold text-gray-700 mb-1.5">Employee <span class="text-rose-400">*</span></label>
          <vee-field as="select" name="staff_id" id="employee-name" v-model="formData.staff_id" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor cursor-pointer">
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
          <vee-field type="number" name="amount" id="amount" v-model="formData.amount" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Amount" min="0" required />
          <ErrorMessage name="amount" class="text-xs text-rose-500 font-semibold my-2" />
        </div>
      </div>

      <!-- Note -->
      <div class="mt-5">
        <label for="note" class="block text-sm font-bold text-gray-700 mb-1.5">Note <span class="text-rose-400">*</span></label>
        <vee-field as="textarea" name="note" id="note" rows="3" v-model="formData.note" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 focus:outline-1 focus:outline-mainColor placeholder:text-sm" placeholder="Write expense note" />
        <ErrorMessage name="note" class="text-xs text-rose-500 font-semibold my-2" />
      </div>

      <!-- File -->
      <div class="mt-5">
          <label for="file" class="block text-sm font-bold text-gray-700 mb-1.5">Upload Attachment <span class="text-rose-400">*</span></label>
          <input type="file" @change="onFileChange" name="file" id="file" class="block w-full p-2.5 rounded-md border border-gray-200 bg-gray-100 cursor-pointer focus:outline-0 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-300 file:text-gray-700 hover:file:bg-gray-400" />
          <ErrorMessage name="file" class="text-xs text-rose-500 font-semibold my-2" />
      </div>

      <button type="submit" class="bg-mainColor text-white py-2 px-5 mt-5 text-base font-semibold font-outfit rounded-md shadow cursor-pointer">
        Create
      </button>
    </vee-form>
  </div>
</template>
