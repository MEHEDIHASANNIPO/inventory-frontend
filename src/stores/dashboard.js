import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    rawData: [],
    notifications: [],
    dashboardInfo: [],
    months: [],
    expense: [],
    sales: [],
    revenue: [],
    errors: [],
    message: [],
    swal: null,
  }),

  getters: {
    getNotificationCount: (state) => state.notifications.length,
  },

  actions: {
    // Dashboard Information
    async getDashboardInfo() {
      try {
        const { data } = await inventoryAxiosClient.get('/dashboard');
        this.rawData = data;
        this.dashboardInfo = data.data;
        this.months  = this.dashboardInfo.stats.map(item => item.month);
        this.expense = this.dashboardInfo.stats.map(item => item.expense);
        this.sales   = this.dashboardInfo.stats.map(item => item.sales);

        this.revenue = this.dashboardInfo.stats.map(item => 
          parseFloat(item.profit) - (parseFloat(item.salary) + parseFloat(item.expense))
        );
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: error,
        })
      }
    },

    // Get All Notifications
    async getNotifications() {
      try {
        const { data } = await inventoryAxiosClient.get('/get-notifications');

        this.rawData = data;
        this.notifications = data.data;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Read All Notifications
    async marAsReadAll() {
      try {
        const { data } = await inventoryAxiosClient.get('/mark-as-readall');

        this.rawData = data;
        this.notifications = data.data;
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