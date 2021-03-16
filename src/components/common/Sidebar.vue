<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" v-has="item.code">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <!-- <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu> -->
                            <el-menu-item
                                :index="subItem.index"
                                :key="subItem.index"
                                v-has="subItem.code"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-has="item.code">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页',
                    code:'XXSY'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '1',
                    title: '会员管理',
                    code:'HYGL',
                    subs: [
                        {
                            index: 'userList',
                            code:'HYGLLB',
                            title: '会员列表'
                        },
                        // {
                        //     index: 'userLevel',
                        //     title: '会员等级'
                        // }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '2',
                    code:'JYGL',
                    title: '交易管理',
                    subs: [
                        {
                            index: 'orderList',
                            code:'DDLB',
                            title: '订单列表'
                        },
                        {
                            index: 'userRecharge',
                            code:'CZGL',
                            title: '充值管理'
                        },
                        {
                            index: 'depositList',
                            code:'TXGL',
                            title: '提现管理'
                        },
                        {
                            index: 'dealConsole',
                            code:'JYKZ',
                            title: '交易控制'
                        },
                        {
                            index: 'brokerageList',
                            code:'YJGLLB',
                            title: '佣金管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    code:'SPGL',
                    title: '商品管理',
                    subs: [
                        {
                            index: 'goodsList',
                            code:'SPGLLB',
                            title: '商品列表'
                        },
                        {
                            index: 'goodsCate',
                            code:'SPGLFL',
                            title: '商品分类'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '9',
                    code:'JFSC',
                    title: '积分商城',
                    subs: [
                        {
                            index: 'integralGood',
                            code:'JFSCLB',
                            title: '积分商品列表'
                        },
                        {
                            index: 'integralRecord',
                            code:'JFSCJL',
                            title: '商品积分记录'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '4',
                    code:'SYWB',
                    title: '首页文本',
                    subs: [
                        {
                            index: 'noticeList',
                            code:'WBGL',
                            title: '文本管理'
                        },
                        {
                            index: 'bannerList',
                            code:'LBTLB',
                            title: '轮播图列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '5',
                    code:'HDGL',
                    title: '活动管理',
                    subs: [
                        {
                            index: 'activityRecord',
                            code:'HDJLLB',
                            title: '活动记录列表'
                        },
                        {
                            index: 'activityType',
                            code:'HDLXLB',
                            title: '活动类型'
                        }
                        // {
                        //     index: 'activeRecharge',
                        //     title: '充值活动'
                        // },
                        // {
                        //     index: 'activeSign',
                        //     title: '签到活动'
                        // },
                        // {
                        //     index: 'activeNew',
                        //     title: '新用户活动'
                        // }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '6',
                    code:'QXGL',
                    title: '权限管理',
                    subs: [
                        {
                            index: 'roleList',
                            code:'JSLB',
                            title: '角色列表'
                        },
                        {
                            index: 'sUser',
                            code:'JSYHLB',
                            title: '系统用户列表'
                        },
                        {
                            index: 'dataClear',
                            code:'XTYHSCSYSJ',
                            title: '数据清理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '7',
                    code:'BMDGL',
                    title: '白名单管理',
                    subs: [
                        {
                            index: 'whiteList',
                            code:'BMDLB',
                            title: '白名单列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '8',
                    code:'XXGL',
                    title: '消息管理',
                    subs: [
                        {
                            index: 'messageList',
                            code:'XXGLLB',
                            title: '消息列表'
                        }
                    ]
                },
                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'table',
                //     title: '基础表格'
                // },
                // {
                //     icon: 'el-icon-lx-copy',
                //     index: 'tabs',
                //     title: 'tab选项卡'
                // },
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: '3',
                //     title: '表单相关',
                //     subs: [
                //         {
                //             index: 'form',
                //             title: '基本表单'
                //         },
                //         {
                //             index: '3-2',
                //             title: '三级菜单',
                //             subs: [
                //                 {
                //                     index: 'editor',
                //                     title: '富文本编辑器'
                //                 },
                //                 {
                //                     index: 'markdown',
                //                     title: 'markdown编辑器'
                //                 }
                //             ]
                //         },
                //         {
                //             index: 'upload',
                //             title: '文件上传'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-emoji',
                //     index: 'icon',
                //     title: '自定义图标'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                // {
                //     icon: 'el-icon-rank',
                //     index: '6',
                //     title: '拖拽组件',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '7',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-redpacket_fill',
                //     index: '/donate',
                //     title: '支持作者'
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        let aaa = this.$store.state
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
/deep/ .sidebar-el-menu{
    width: 180px !important;
    overflow-x: hidden;
}
</style>
