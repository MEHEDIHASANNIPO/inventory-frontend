import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useRoleStore = defineStore('role', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    roles: [],
    role: null,
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
      role_name: null,
      role_note: null,
      permissions: []
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    // All List
    async getAllRoles() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-roles');

        this.rawData = data;
        this.roles = data.data;
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
    async getRoles(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/roles', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        });

        this.rawData = data;
        this.roles = data.data.data;
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
    async storeRole(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/roles', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'roles' })
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
    async getRole(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/roles/${id}`);

        this.role = data.data;
        this.editFormData.role_name = data.data.role_name;
        this.editFormData.role_note = data.data.role_note;
        this.editFormData.permissions = data.data.permissions.map(p => p.id);
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
    async updateRole(formData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/roles/${id}`, formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'roles' })
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
    async deleteRole(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/roles/${id}`);

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
