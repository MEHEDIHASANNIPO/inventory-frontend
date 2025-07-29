import { ref, computed } from 'vue' 
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    expenses: [],
    expense: null,
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
      expense_category_id: null,
      staff_id: null,
      amount: 0,
      note: null,
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
    async getAllExpenses() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-expenses');

        this.rawData = data;
        this.expenses = data.data;
        this.pagination.totalCount = data.metadata.count;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        });
      }
    },

    // All List with Pagination
    async getExpenses(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/expenses', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        });

        this.rawData = data;
        this.expenses = data.data.data;
        this.pagination.current_page = data.data.current_page;
        this.pagination.last_page = data.data.last_page;
        this.pagination.totalCount = data.data.total;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        });
      }
    },

    // Store Data
    async storeExpense(formData) {
      try {
        const config = {
          headers: {
            'content-type' : 'multipart/form-data'
          }
        };
        const { data } = await inventoryAxiosClient.post('/expenses', formData, config);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        });

        this.router.push({ name: 'expenses' });
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        });
      }
    },

    // Single Data
    async getExpense(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/expenses/${id}`);

        this.expense = data.data;

        this.editFormData.expense_category_id = data.data.expense_category_id;
        this.editFormData.staff_id = data.data.staff_id;
        this.editFormData.amount = data.data.amount;
        this.editFormData.note = data.data.note;

      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        });
      }
    },

    // Update Data
    async updateExpense(formData, id) {
      try {
        const config = {
          headers: {
            'content-type' : 'multipart/form-data'
          }
        };

        const { data } = await inventoryAxiosClient.post(`/expenses/${id}`, formData, config);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        });

        this.router.push({ name: 'expenses' });
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        });
      }
    },
  }
})
