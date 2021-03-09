import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import has from './utils/permissions.js'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `后台管理系统`;
    var exp = 60 * 60 * 4 * 1000; // 时长
    //document.title = `${to.meta.title} | 后台管理系统`;
    const data = localStorage.getItem('userObj');
    const dataObj = JSON.parse(data); // 将字符串转换成JSON对象
    if (!dataObj && to.path !== '/login') {
        next('/login');
    } else {
        if(dataObj){
            let nowTimes = new Date().getTime()
            var isTimed = (nowTimes - dataObj.timer) > exp
            if(isTimed) {
                Vue.prototype.$alert('登录已过期，请重新登录', '', {
                    confirmButtonText: '确定'
                });
                localStorage.removeItem('userObj');
                store.state.authList = null
                next('/login');
            }else{
                if(!store.state.authList){
                    store.state.authList = dataObj.permissions
                }
            }
        }
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
