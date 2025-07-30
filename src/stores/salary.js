import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useSalarystore = defineStore('salary', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    salaries: [],
    salary: null,
    errors: [],
    message: [],
    swal: null,
    router: null,
    salaryTypes: ['Regular', 'Advance', 'Late'],

    pagination: {
      current_page: 1,
      last_page: 0,
      totalCount: 0
    },

    editFormData: {
      staff_id: null,
      amount: 0,
      date: null,
      month: null,
      year: null,
      type: null,
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    // All List
    async getAllSalaries() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-salaries')

        this.rawData = data
        this.salaries = data.data
        this.pagination.totalCount = data.metadata.count
      } catch (error) {
        this.errors = error.response?.data
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // All List with Pagination
    async getSalaries(page = 1, limit = this.dataLimit, search = '', filterFormData = "") {
      try {
        const { data } = await inventoryAxiosClient.get('/salaries', {
          params: {
            page: page,
            per_page: limit,
            search: search,
            date: filterFormData.date,
            month: filterFormData.month,
            year: filterFormData.year,
            type: filterFormData.type,
          }
        })

        this.rawData = data
        this.salaries = data.data.data
        this.pagination.current_page = data.data.current_page
        this.pagination.last_page = data.data.last_page
        this.pagination.totalCount = data.data.total
      } catch (error) {
        this.errors = error.response?.data
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Store Data
    async storeSalary(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/salaries', formData)

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'salaries' })
      } catch (error) {
        this.errors = error.response?.data
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Single Data
    async getSalary(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/salaries/${id}`)

        this.salary = data.data
        this.editFormData.staff_id = data.data.staff_id
        this.editFormData.amount = data.data.amount
        this.editFormData.date = data.data.date
        this.editFormData.month = data.data.month
        this.editFormData.year = data.data.year
        this.editFormData.type = data.data.type
      } catch (error) {
        this.errors = error.response?.data
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Update Data
    async updateSalary(formData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/salaries/${id}`, formData)

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'salaries' })
      } catch (error) {
        this.errors = error.response?.data
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Delete Data
    async deleteSalary(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/salaries/${id}`)

        callback('success')

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })
      } catch (error) {
        this.errors = error.response?.data
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })

        callback('error')
      }
    },
  }
})
