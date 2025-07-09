import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useCategoryStore = defineStore('category', {
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
      category_name: null,
      category_code: null,
    }
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    async getAllCategories() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-categories');

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

    async getCategories(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/categories', {
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

    async storeCategory(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/categories', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'categories' })
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    async getCategory(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/categories/${id}`);

        this.category = data.data;
        this.editFormData.category_name = data.data.category_name;
        this.editFormData.category_code = data.data.category_code;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    async updateCategory(formData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/categories/${id}`, formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'categories' })
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    async deleteCategory(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/categories/${id}`);

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

    async changeStatus(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/category/status/${id}`);

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