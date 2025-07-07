import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { baseClient, inventoryAxiosClient } from '@/utilis/systemaxios'

export const useLoginStore = defineStore('login', {
  state: () => ({
    token: localStorage.getItem('token') || 0,
    username: localStorage.getItem('user') || 0,
    permissions: [],
    errors: [],
    message: [],
  }),

  getters: {
    getToken: (state) => state.token,
    getUsername: (state) => state.username,
    getPermissions: (state) => state.permissions,
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    setUsername(username) {
      this.username = username;
      localStorage.setItem('user', username);
    },

    setPermissions(permissions) {
      this.permissions = permissions;
    },

    removeToken: () => localStorage.removeItem('token'),
    removeUsername: () => localStorage.removeItem('user'),

    async login (formData, callback) {
      try {
        const response = await baseClient.get('/sanctum/csrf-cookie');

        const { data } = await inventoryAxiosClient.post('/login', formData);

        if(data) {
          this.setToken(data.data.token);
          this.setUsername(data.data.user);
          this.message = data.message;
          callback('success');
        }
      } catch (error) {
        this.errors = error.response?.data;
        this.removeToken();
        this.removeUsername();
        this.message = this.errors.message;
        callback(error);
      }
    },

    async fetchPermissions() {
      try {
        const { data } = await inventoryAxiosClient.get('/user-permissions');
        
        this.setPermissions(data.data);
      } catch (error) {
        console.error('User fetch error', error);
        this.removeToken();
        this.removeUsername();
      }
    }
  }
})
