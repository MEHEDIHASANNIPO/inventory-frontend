import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    employees: [],
    employee: null,
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
      nid: null,
      address: null,
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
    async getAllEmployees() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-employees');

        this.rawData = data;
        this.employees = data.data;
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
    async getEmployees(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/employees', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        });

        this.rawData = data;
        this.employees = data.data.data;
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
    async storeEmployee(formData) {
      try {
        const config = {
          headers: {
            'content-type' : 'multipart/form-data'
          }
        };
        const { data } = await inventoryAxiosClient.post('/employees', formData, config);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'employees' })
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
    async getEmployee(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/employees/${id}`);

        this.employee = data.data;

        this.editFormData.name = data.data.name;
        this.editFormData.email = data.data.email;
        this.editFormData.phone = data.data.phone;
        this.editFormData.nid = data.data.nid;
        this.editFormData.address = data.data.address;

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
    async updateEmployee(formData, id) {
      try {
        const config = {
          headers: {
            'content-type' : 'multipart/form-data'
          }
        };
        const { data } = await inventoryAxiosClient.post(`/employees/${id}`, formData, config);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'employees' })
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
    async deleteEmployee(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/employees/${id}`);

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
        const { data } = await inventoryAxiosClient.get(`/employee/status/${id}`);

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
