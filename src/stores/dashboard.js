import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    rawData: [],
    notifications: [],
    errors: [],
    message: [],
    swal: null,
    router: null,
  }),

  getters: {
    getNotificationCount: (state) => state.notifications.length,
  },

  actions: {
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