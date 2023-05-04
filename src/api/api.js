import axios from 'axios';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const _updateInterceptors = async (instance = null, tokens = null) => {
    // This function will add the access token to the Bearer token Authorization
    if (instance) {
        if (!tokens) {
            // If not tokens are provided, get the tokens from the localstorage
            tokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
        }
        if (tokens) {
            // Remove existing interceptor
            instance.interceptors.request.eject(instance.tokenInterceptor);

            // Create new interceptor with updated token
            instance.tokenInterceptor = instance.interceptors.request.use(function (config) {
                config.headers.Authorization = `Bearer ${tokens.access}`;
                return config;
            });
        } else {
            // Remove authorization header from axios instance
            instance.interceptors.request.eject(instance.tokenInterceptor);
        }
    }
};

let instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT || `http://demo1.localhost:8000/api`
});

const Api = {
    // Authentication
    login: async function (payload) {
        _updateInterceptors(instance);
        const response = await instance.post(`/auth/login/`, payload);
        let tokens = response.data;
        _updateInterceptors(instance, tokens);
        return response;
    },
    logout: async function (payload) {
        const response = instance.post(`/auth/logout/`, payload);
        _updateInterceptors(instance);
        return response;
    },
    refreshToken: async function (payload) {
        const response = await instance.post(`/auth/refresh/`, payload);
        let tokens = response.data;
        _updateInterceptors(instance, tokens);
        return response;
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
