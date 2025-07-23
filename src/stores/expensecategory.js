import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useExpenseCategoryStore = defineStore('expensecategory', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    categories: [],
    category: null,
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
      category_name: null
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    // All List
    async getAllExpenseCategories() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-expense-categories');

        this.rawData = data;
        this.categories = data.data;
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
    async getExpenseCategories(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/expense-categories', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        });

        this.rawData = data;
        this.categories = data.data.data;
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
    async storeExpenseCategory(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/expense-categories', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'expenseCategories' })
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
    async getExpenseCategory(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/expense-categories/${id}`);

        this.category = data.data;
        this.editFormData.category_name = data.data.category_name;
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
    async updateExpenseCategory(formData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/expense-categories/${id}`, formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'expenseCategories' })
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
    async deleteExpenseCategory(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/expense-categories/${id}`);

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
        const { data } = await inventoryAxiosClient.get(`/expense-category/status/${id}`);

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