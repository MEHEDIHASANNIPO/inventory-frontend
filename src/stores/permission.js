import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    permissions: [],
    permission: null,
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
      module_id: 0,
      permission_name: null,
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    // All List
    async getAllPermissions() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-permissions');

        this.rawData = data;
        this.permissions = data.data;
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
    async getPermissions(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/permissions', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        });

        this.rawData = data;
        this.permissions = data.data.data;
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
    async storePermission(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/permissions', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'permissions' })
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
    async getPermission(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/permissions/${id}`);

        this.permission = data.data;
        this.editFormData.module_id = data.data.module_id;
        this.editFormData.permission_name = data.data.permission_name;
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
    async updatePermission(formData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/permissions/${id}`, formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'permissions' })
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
    async deletePermission(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/permissions/${id}`);

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
