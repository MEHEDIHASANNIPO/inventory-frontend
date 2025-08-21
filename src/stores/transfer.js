import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useTransferStore = defineStore('transfer', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    transfers: [],
    transfer: null,
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
      transfer_name: null,
      transfer_code: null,
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    // All List
    async getAllTransfers() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-transfers');

        this.rawData = data;
        this.transfers = data.data;
        this.pagination.totalCount = data.metadata.count;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // All List with Pagination
    async getTransfers(page = 1, limit = this.dataLimit, search = '', filterFormData = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/transfers', {
          params: {
            page: page,
            per_page: limit,
            search: search,
            date: filterFormData.date,
            warehouse: filterFormData.warehouse,
          }
        });

        this.rawData = data;
        this.transfers = data.data.data;
        this.pagination.current_page = data.data.current_page;
        this.pagination.last_page = data.data.last_page;
        this.pagination.totalCount = data.data.total;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Store Data
    async storeTransfer(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/transfers', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'transfers' })
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Single Data
    async getTransfer(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/transfers/${id}`);

        this.transfer = data.data;
        this.editFormData.transfer_name = data.data.transfer_name;
        this.editFormData.transfer_code = data.data.transfer_code;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Update Data
    async updateTransfer(formData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/transfers/${id}`, formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'transfers' })
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Delete Data
    async deleteTransfer(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/transfers/${id}`);

        callback('success');

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })

        callback('error');
      }
    },
  }
})
