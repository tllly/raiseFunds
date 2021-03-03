import axios from 'axios';
import { Message } from 'element-ui';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: '/api',
    //baseURL: 'http://81.71.27.180:8080/',
    //baseURL: 'http://192.168.1.165:8400/',
    timeout: 5000
})

service.interceptors.request.use( config => {
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    if(response.status === 200){
        
        if(response.data.code == 200){
            return response.data;
        }else{
            Message.error(response.data.viewMsg);
            return Promise.reject();
        }
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;