import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/userList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/user/users.vue'),
                    meta: { title: '会员列表' }
                },
                {
                    path: '/userLevel',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/user/level.vue'),
                    meta: { title: '会员等级' }
                },
                {
                    path: '/orderList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/order/orderList.vue'),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/userRecharge',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/order/userRecharge.vue'),
                    meta: { title: '充值管理' }
                },
                {
                    path: '/depositList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/order/depositList.vue'),
                    meta: { title: '提现管理' }
                },
                {
                    path: '/dealConsole',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/order/dealConsole.vue'),
                    meta: { title: '交易控制' }
                },
                {
                    path: '/goodsList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/goods/goodsList.vue'),
                    meta: { title: '商品列表' }
                },
                {
                    path: '/goodsAdd',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/goods/add.vue'),
                    meta: { title: '添加商品' }
                },
                {
                    path: '/goodsEdit',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/goods/add.vue'),
                    meta: { title: '编辑商品' }
                },
                {
                    path: '/goodsCate',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/goods/goodsCate.vue'),
                    meta: { title: '商品分类' }
                },
                {
                    path: '/addCate',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/goods/addGate.vue'),
                    meta: { title: '添加商品分类' }
                },
                {
                    path: '/upDateCate',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/goods/addGate.vue'),
                    meta: { title: '编辑商品分类' }
                },
                {
                    path: '/noticeList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/indexText/noticeList.vue'),
                    meta: { title: '公告列表' }
                },
                {
                    path: '/noticeAdd',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/indexText/noticeAdd.vue'),
                    meta: { title: '添加公告' }
                },
                {
                    path: '/upDateNotice',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/indexText/noticeAdd.vue'),
                    meta: { title: '编辑公告' }
                },
                {
                    path: '/bannerList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/indexText/bannerList.vue'),
                    meta: { title: '轮播图列表' }
                },
                {
                    path: '/bannerAdd',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/indexText/bannerAdd.vue'),
                    meta: { title: '添加轮播图' }
                },
                {
                    path: '/upDatebanner',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/indexText/bannerAdd.vue'),
                    meta: { title: '编辑轮播图' }
                },
                {
                    path: '/roleList',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/authority/roleList.vue'),
                    meta: { title: '角色列表' }
                },
                {
                    path: '/sUser',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/authority/userList.vue'),
                    meta: { title: '系统用户' }
                },
                {
                    path: '/activityRecord',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/activity/recordList.vue'),
                    meta: { title: '活动记录' }
                },
                {
                    path: '/activeRecharge',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/activity/activeRecharge.vue'),
                    meta: { title: '充值活动' }
                },
                {
                    path: '/activeSign',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/activity/activeSign.vue'),
                    meta: { title: '签到活动' }
                },
                {
                    path: '/activeNew',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/activity/activeNew.vue'),
                    meta: { title: '新用户活动' }
                },
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/views/home/index.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/views/login/index.vue')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
