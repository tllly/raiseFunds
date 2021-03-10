import axios from 'axios';
import { Message,Loading } from 'element-ui';

//开始加载动画
let loading;
function startLoading() {
    loading  = Loading.service({
        //lock:true, //是否锁定
        text:'Loading',//加载中需要显示的文字
        spinner: 'el-icon-loading',
        background:'rgba(0,0,0,.1)',//背景颜色
    });
}
//结束加载动画
function endLoading() {
    loading.close();
}

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: '/api',
    // baseURL: 'http://192.168.1.125:9200/',
    //baseURL: 'http://192.168.1.165:8400/',
    timeout: 5000
})

service.interceptors.request.use( config => {
    startLoading();//请求时的加载动画
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
    endLoading();//结束加载动画
    if(response.status === 200){
        
        if(response.data.code == 200){
            return response.data;
        }else if(response.data.code == 1004){
            localStorage.removeItem('userObj');
            window.location.href = "/";
        }else{
            Message.error(response.data.viewMsg);
            return Promise.reject();
        }
    }else{
        Promise.reject();
    }
}, error => {
    endLoading();//结束加载动画
    console.log(error);
    return Promise.reject();
})

export default service;