import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'

export const useBackupStore = defineStore('backup', {
  state: () => ({
    rawData: [],
    backups: [],
    errors: [],
    message: [],
    swal: null,
    router: null,
    count: 0
  }),

  getters: {
    getTotalCount: (state) => state.count,
  },

  actions: {
    // All List with Pagination
    async getBackups() {
      try {
        const { data } = await inventoryAxiosClient.get('/backups');

        this.rawData = data;
        this.backups = data.data;
        this.count = data.metadata.count;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: error
        })
      }
    },

    // Store Data
    async storeBackup(formData) {
      try {
        const { data } = await inventoryAxiosClient.post('/backups', formData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        })

        this.router.push({ name: 'backups' })
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
    async deleteBackup(name, callback) {
      try {
        const { data } = await inventoryAxiosClient.delete(`/backups/${name}`);

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

    // Download Backup
    async downloadBackup(name) {
      try {
        const response = await inventoryAxiosClient.get(`/download-backup/${name}`, {
          responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }, 100);
        
        this.swal({
          icon: 'success',
          title: 'Backup Download Successfully!',
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
