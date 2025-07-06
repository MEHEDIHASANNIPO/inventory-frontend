import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'
import config from '@/utilis/config'
import { useLoginStore } from './login'

export const useProfileSettingStore = defineStore('profilesetting', {
  state: () => ({
    rawData: [],
    profileInfo: [],
    files: [],
    image: null,
    errors: [],
    message: [],
    swal: null,
    router: null,

    profileSettingData: {
      name: null,
      email: null,
      phone: null,
      file: null
    }
  }),

  getters: {
    profileIamge: (state) => state.image ? config.inventoryApiHost + state.image : null
  },

  actions: {
    // Upload File
    uploadFile(fileItems) {
      this.files = fileItems
      this.profileSettingData.file = fileItems.length ? fileItems[0].file : null
    },
    
    // Profile Data
    async profileSettingInfo() {
      try {
        const { data } = await inventoryAxiosClient.get('/profile-info');

        this.rawData = data;
        this.profileInfo = data.data;

        this.profileSettingData.name = this.profileInfo.name;
        this.profileSettingData.email = this.profileInfo.email;
        this.profileSettingData.phone = this.profileInfo.phone;
        this.image = this.profileInfo.file;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Update Profile Setting
    async updateProfile(fromData) {
      try {
        const config = {
          headers: {
            'content-type' : 'multipart/form-data'
          }
        }
        const { data } = await inventoryAxiosClient.post(`/update-profile/`, fromData, config);
        this.files = [];
        localStorage.setItem('user', this.profileSettingData.name);
        
        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        });

        this.profileSettingInfo();
        this.router.push({ name: 'dashboard' });
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Update Password
    async updatePassword(fromData) {
      try {
        const loginStore = useLoginStore();
        const { data } = await inventoryAxiosClient.post(`/update-password/`, fromData);
        
        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        });

        if(data.status == 'success') {
          loginStore.removeToken();
          loginStore.removeUsername();

          this.router.push({ name: 'login' });
        }
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
