import axios from 'axios';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT || `http://demo1.localhost:8000/api`
});

const Api = {
    signin: function signin(payload) {
        return instance.post(`/auth/signin/`, payload);
    },
    refreshToken: function signin(payload) {
        return instance.post(`/auth/refresh/`, payload);
    }
};

export default Api;
