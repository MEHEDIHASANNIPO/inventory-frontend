import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useProductStore = defineStore('product', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    products: [],
    product: null,
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
      category_id: null,
      brand_id: null,
      supplier_id: null,
      warehouse_id: null,
      product_name: null,
      product_slug: null,
      product_code: null,
      original_price: 0,
      sell_price: 0,
      stock: 0,
      description: null,
      qrcode: null,
      barcode: null,
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
    async getAllProducts() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-products');

        this.rawData = data;
        this.products = data.data;
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
    async getProducts(page = 1, limit = this.dataLimit, search = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/products', {
          params: {
            page: page,
            per_page: limit,
            search: search,
          }
        });

        this.rawData = data;
        this.products = data.data.data;
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
    async storeProduct(formData) {
      try {
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        const { data } = await inventoryAxiosClient.post('/products', formData, config);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'products' })
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
    async getProduct(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/products/${id}`);

        this.product = data.data;

        this.editFormData.category_id = data.data.category_id;
        this.editFormData.brand_id = data.data.brand_id;
        this.editFormData.supplier_id = data.data.supplier_id;
        this.editFormData.warehouse_id = data.data.warehouse_id;
        this.editFormData.product_name = data.data.product_name;
        this.editFormData.product_slug = data.data.product_slug;
        this.editFormData.product_code = data.data.product_code;
        this.editFormData.original_price = data.data.original_price;
        this.editFormData.sell_price = data.data.sell_price;
        this.editFormData.stock = data.data.stock;
        this.editFormData.description = data.data.description;
        this.editFormData.qrcode = data.data.qrcode;
        this.editFormData.barcode = data.data.barcode;
        this.image = data.data.file;

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
    async updateProduct(formData, id) {
      try {
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        };
        const { data } = await inventoryAxiosClient.post(`/products/${id}`, formData, config);
        this.files = [];
        
        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'products' })
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
    async deleteProduct(id, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/products/${id}`);

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
        const { data } = await inventoryAxiosClient.get(`/product/status/${id}`);

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
