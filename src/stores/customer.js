import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    customers: [],
    customer: null,
    files: [],
    image: null,
    errors: [],
    message: [],
    swal: null,
    router: null,

    pagination: {
      current_page: 1,
      last_page: 0,
      totalCount: 0
    },

    editFormData: {
      name: null,
      email: null,
      phone: null,
      file: null,
      _method: 'PUT'
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
    getFileUrl: () => config.inventoryApiHost
  },

  actions: {
    // Upload File Edit Page
    uploadFile(fileItems) {
      this.files = fileItems
      this.editFormData.file = fileItems.length ? fileItems[0].file : null
    },

    // All List
    async getAllCustomers() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-customers')

        this.rawData = data
        this.customers = data.data
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
    async getCustomers(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/customers', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        })

        this.rawData = data
        this.customers = data.data.data
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
    async storeCustomer(formData) {
      try {
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        const { data } = await inventoryAxiosClient.post('/customers', formData, config)

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'customers' })
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
    async getCustomer(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/customers/${id}`)

        this.customer = data.data

        this.editFormData.name = data.data.name
        this.editFormData.email = data.data.email
        this.editFormData.phone = data.data.phone
        this.image = data.data.file;

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
    async updateCustomer(formData, id) {
      try {
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        const { data } = await inventoryAxiosClient.post(`/customers/${id}`, formData, config)

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'customers' })
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
    async deleteCustomer(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/customers/${id}`)

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

    // Change Status
    async changeStatus(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/customer/status/${id}`)

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
      }
    },
  }
})
