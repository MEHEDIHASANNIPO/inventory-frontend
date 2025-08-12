import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useOrderStore = defineStore('order', {
  state: () => ({
    rawData: [],
    dataLimit: config.defaultDataLimit || 10,
    orders: [],
    errors: [],
    message: [],
    swal: null,
    router: null,
    paymentMethods: ['PayPal', 'Stripe', 'Wise', 'Skrill', 'Cash'],

    pagination: {
      current_page: 1,
      last_page: 0,
      totalCount: 0
    },
  }),

  getters: {
    getTotalCount: (state) => state.pagination.totalCount,
  },

  actions: {
    // All List with Pagination
    async getOrders(page = 1, limit = this.dataLimit, search = '', filterFormData = '') {
      try {
        const { data } = await inventoryAxiosClient.get('/orders', {
          params: {
            page: page,
            per_page: limit,
            search: search,
            customer_id: filterFormData.customer_id,
            created_at: filterFormData.created_at,
            month: filterFormData.month,
            year: filterFormData.year,
            payment: filterFormData.payment,
          }
        });

        this.rawData = data;
        this.orders = data.data.data;
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
    async storeOrder(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/orders', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'orders' })
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Invoice Download
    async downloadInvoice(id) {
      try {
        const response = await inventoryAxiosClient.get(`/invoice-download/${id}`, {
          responseType: 'blob'
        });

        // Create blob and trigger download
        const file = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = file;
        link.setAttribute('download', `invoice_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        this.swal({
          icon: 'success',
          title: 'Invoice Downloaded!',
          timer: 1200
        });
      } catch (error) {
        const err = await error.response?.data?.text?.();
        let errorMessage = 'Something went wrong!';
        try {
          const parsedError = JSON.parse(err);
          errorMessage = parsedError.message || errorMessage;
        } catch (_) {}

        this.swal({
          icon: 'error',
          title: 'Download Failed!',
          text: errorMessage,
        });
      }
    },
  }
})
