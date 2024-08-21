import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = `${process.env.VUE_APP_API_URL}`;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    }),
    getters: {
        getUser: (state) => state.user,
        getUserPermissions: (state) => state.user.permissions || []
    },
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post(`${baseUrl}/admin/login`, {
                    email,
                    password
                })
                const { data } = response
                console.log(data)
                this.user = data.user
                this.user.permissions = data.permissions
                localStorage.setItem('user', JSON.stringify(this.user))
                return true; 
            } catch (error) {
                console.error('Login failed:', error);
                return false; 
            }
        },
        logout() {
            localStorage.removeItem('user');
            this.user = null;
           },
    }
});
