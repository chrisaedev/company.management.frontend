import axios from 'axios';
import pages from 'menu-items/pages';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT || `http://demo1.localhost:8000/api`
});

const updateInterceptors = async (tokens = null) => {
    // This function will add the access token to the Bearer token Authorization
    if (!tokens) {
        tokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    }
    if (tokens) {
        instance.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${tokens.access}`;
            return config;
        });
    }
};

updateInterceptors();

const Api = {
    // authentication
    login: async function (payload) {
        const response = await instance.post(`/auth/login/`, payload);
        const tokens = response.data;
        updateInterceptors(tokens);
        return response;
    },
    logout: function (payload) {
        return instance.post(`/auth/logout/`, payload);
    },
    refreshToken: function (payload) {
        return instance.post(`/auth/refresh/`, payload);
    },

    // Features
    // Storage
    // Items
    getItems: function (page, rowsPerPage) {
        return instance.get(`/storage/items/?page=${page + 1}&page_size=${rowsPerPage}`);
    },
    postItems: function (payload) {
        return instance.post(`/storage/items/`, payload);
    }
};

export default Api;
