import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'

export const useSystemSettingStore = defineStore('systemsetting', {
  state: () => ({
    rawData: [],
    systemSetting: [],
    timeZoneList: [],
    errors: [],
    message: [],
    swal: null,
    router: null,

    settingData: {
      site_name: null,
      site_tagline: null,
      site_email: null,
      site_phone: null,
      site_timezone: 0,
      site_facebook_link: null,
      site_address: null,
      meta_keywords: null,
      meta_description: null,
      meta_author: null,
    }
  }),

  getters: {
    siteName: (state) => state.settingData.site_name,
    siteTagline: (state) => state.settingData.site_tagline,
  },

  actions: {
    // System Setting Data
    async systemSettingInfo() {
      try {
        const { data } = await inventoryAxiosClient.get('/system-setting');

        this.rawData = data;
        this.systemSetting = data.data;

        this.settingData.site_name = this.systemSetting.site_name;
        this.settingData.site_tagline = this.systemSetting.site_tagline;
        this.settingData.site_email = this.systemSetting.site_email;
        this.settingData.site_phone = this.systemSetting.site_phone;
        this.settingData.site_facebook_link = this.systemSetting.site_facebook_link;
        this.settingData.site_address = this.systemSetting.site_address;
        this.settingData.meta_keywords = this.systemSetting.meta_keywords;
        this.settingData.meta_description = this.systemSetting.meta_description;
        this.settingData.meta_author = this.systemSetting.meta_author;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Time Zone
    async siteTimeZone() {
      try {
        const { data } = await inventoryAxiosClient.get('/site-timezone');

        this.rawData = data;
        this.timeZoneList = data.data.availableTimezones;
        this.settingData.site_timezone = data.data.defaultTimezoneIndex;
      } catch (error) {
        this.errors = error.response?.data;
        this.swal({
          icon: 'error',
          title: 'Something went wrong!',
          text: this.errors.message,
        })
      }
    },

    // Update System Setting
    async updateSetting(fromData, id) {
      try {
        const { data } = await inventoryAxiosClient.put(`/system-setting/${id}`, fromData);

        this.swal({
          icon: data.status,
          title: data.message,
          timer: 1000
        });

        this.systemSettingInfo();
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
  }
})
