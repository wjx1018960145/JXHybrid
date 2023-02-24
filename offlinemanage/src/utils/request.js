import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' ,
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://localhost:8095',
    timeout: 5000,
    headers: {

        'Content-Type': 'application/json;charset=UTF-8',

    },
});

service.interceptors.request.use(
    config => {
        config.headers['Content-Type']='application/json'
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
