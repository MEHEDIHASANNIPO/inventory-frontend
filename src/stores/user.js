import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useUserStore = defineStore('user', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    users: [],
    user: null,
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
      role_id: null,
      name: null,
      email: null,
      phone: null,
      nid: null,
      address: null,
      company_name: null,
      file: null,
      _method: 'PUT'
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
    getFileUrl: () => config.inventoryApiHost
  },

  actions: {
    // All List
    async getAllUsers() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-users');

        this.rawData = data;
        this.users = data.data;
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
    async getUsers(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/users', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        });

        this.rawData = data;
        this.users = data.data.data;
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
    async storeUser(formData) {
      try {
        const config = {
          headers: {
            'content-type' : 'multipart/form-data'
          }
        };
        const { data } = await inventoryAxiosClient.post('/users', formData, config);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'users' })
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
    async getUser(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/users/${id}`);

        this.user = data.data;

        this.editFormData.role_id = data.data.role_id;
        this.editFormData.name = data.data.name;
        this.editFormData.email = data.data.email;
        this.editFormData.phone = data.data.phone;
        this.editFormData.nid = data.data.nid;
        this.editFormData.address = data.data.address;
        this.editFormData.company_name = data.data.company_name;

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
    async updateUser(formData, id) {
      try {
        const config = {
          headers: {
            'content-type' : 'multipart/form-data'
          }
        };
        const { data } = await inventoryAxiosClient.post(`/users/${id}`, formData, config);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'users' })
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
    async deleteUser(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/users/${id}`);

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

    // Change Status
    async changeStatus(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/user/status/${id}`);

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
      }
    },
  }
})
