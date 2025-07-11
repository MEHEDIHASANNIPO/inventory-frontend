import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    warehouses: [],
    warehouse: null,
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
      warehouse_name: null,
      warehouse_address: null,
      warehouse_zipcode: null,
      warehouse_phone: null
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    // All List
    async getAllWareHouses() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-warehouses')

        this.rawData = data
        this.warehouses = data.data
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
    async getWareHouses(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/warehouses', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        })

        this.rawData = data
        this.warehouses = data.data.data
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
    async storeWareHouse(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/warehouses', formData)

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'warehouses' })
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
    async getWareHouse(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/warehouses/${id}`)

        this.warehouse = data.data
        this.editFormData.warehouse_name = data.data.warehouse_name
        this.editFormData.warehouse_address = data.data.warehouse_address
        this.editFormData.warehouse_zipcode = data.data.warehouse_zipcode
        this.editFormData.warehouse_phone = data.data.warehouse_phone
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
    async updateWareHouse(formData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/warehouses/${id}`, formData)

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'warehouses' })
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
    async deleteWareHouse(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/warehouses/${id}`)

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
        const { data } = await inventoryAxiosClient.get(`/warehouse/status/${id}`)

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
