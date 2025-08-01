import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useCartStore = defineStore('cart', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    carts: [],
    subtotal: 0,
    cartcount: 0,
    errors: [],
    message: [],
    swal: null,
    router: null,

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
    getTotalCount: (state) => state.cartcount,
    getSubtotal: (state) => state.subtotal
  },

  actions: {
    // Get All Carts
    async getCartItems() {
      try {
        const { data } = await inventoryAxiosClient.get('/all-carts');

        this.rawData = data;
        this.carts = data.data;
        this.cartcount = data.metadata.count;
        this.subtotal = data.metadata.subtotal;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Add To Cart
    async addToCart(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/add-to-cart', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'posIndex' })
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Remove From Cart
    async removeFromCart(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/remove-from-cart/${id}`);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.getCartItems();
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Increase Cart QTY
    async increaseQty(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/increase-cart-item/${id}`);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.getCartItems();
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Decrease Cart QTY
    async decreaseQty(id) {
      try {
        const { data } = await inventoryAxiosClient.get(`/decrease-cart-item/${id}`);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.getCartItems();
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
