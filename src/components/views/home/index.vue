<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统首页
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="padding: 0 0 15px;">
                <el-tag :effect="type === '' ? 'dark':''" type="" style="margin-right: 15px;cursor: pointer;" @click="switchData('')">所有数据</el-tag>
                <el-tag :effect="type === 0 ? 'dark':''" type="" style="margin-right: 15px;cursor: pointer;" @click="switchData(0)">真人数据</el-tag>
                <el-tag :effect="type === 1 ? 'dark':''" type="" style="margin-right: 15px;cursor: pointer;" @click="switchData(1)">假人数据</el-tag>
            </div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="store-total-container store-total-item1">
                        <div>商品总量</div>
                        <div>{{goodsData.count}}</div>
                        <div>今日新增商品 <span class="num2">{{goodsData.today}}</span></div>
                        <div>昨日新增商品 {{goodsData.yesterday}}</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="store-total-container store-total-item2">
                        <div>用户总量</div>
                        <div>{{userssData.count}}</div>
                        <div>今日新增用户 <span class="num2">{{userssData.today}}</span></div>
                        <div>昨日新增用户 {{userssData.yesterday}}</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="store-total-container store-total-item3">
                        <div>订单总量</div>
                        <div>{{ordersData.count}}</div>
                        <div>今日新增用户 <span class="num2">{{ordersData.today}}</span></div>
                        <div>昨日新增用户 {{ordersData.yesterday}}</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="store-total-container store-total-item4">
                        <div>订单总金额</div>
                        <div>{{orderMoneyData.count.toFixed(2)}}</div>
                        <div>今日新增订单总金额 <span class="num2">{{orderMoneyData.today.toFixed(2)}}</span></div>
                        <div>昨日新增订单总金额 {{orderMoneyData.yesterday.toFixed(2)}}</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-top: 20px;">
                <el-col :span="4">
                    <div class="store-total-container store-total-item5">
                        <div>用户充值</div>
                        <div>{{rechargeMoney.count.toFixed(2)}}</div>
                        <div>今日新增充值 <span class="num2">{{rechargeMoney.today.toFixed(2)}}</span></div>
                        <div>昨日新增充值 {{rechargeMoney.yesterday.toFixed(2)}}</div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="store-total-container store-total-item6">
                        <div>用户提现</div>
                        <div>{{depositMoney.count.toFixed(2)}}</div>
                        <div>今日新增提现 <span class="num2">{{depositMoney.today.toFixed(2)}}</span></div>
                        <div>昨日新增提现 {{depositMoney.yesterday.toFixed(2)}}</div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="store-total-container store-total-item7">
                        <div>抢单佣金</div>
                        <div>{{conveyReward.count.toFixed(2)}}</div>
                        <div>今日新增佣金 <span class="num2">{{conveyReward.today.toFixed(2)}}</span></div>
                        <div>昨日新增佣金 {{conveyReward.yesterday.toFixed(2)}}</div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="store-total-container store-total-item8">
                        <div>下级返佣</div>
                        <div>{{childReward.count.toFixed(2)}}</div>
                        <div>今日新增佣金 <span class="num2">{{childReward.today.toFixed(2)}}</span></div>
                        <div>昨日新增佣金 {{childReward.yesterday.toFixed(2)}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="store-total-container store-total-item9">
                        <div>用户总余额</div>
                        <div>{{userBanlance.count.toFixed(2)}}</div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import { fetchData , postData , updateData } from '../../../api/index';
    export default {
        name: 'dashboard',
        data() {
            return {
                goodsData:{},
                userssData:{},
                ordersData:{},
                orderMoneyData:{},
                rechargeMoney:{},
                depositMoney:{},
                conveyReward:{},
                childReward:{},
                userBanlance:{},
                type:''
            }
        },
        computed: {

        },
        created(){
            this.getGoodsData()
            this.getUsersData()
            this.getOrdersData()
            this.getOrdersMoney()
            this.getRechargeMoney()
            this.getDepositMoney()
            this.getConveyReward()
            this.getChildReward()
            this.getUserBanlance()
        },
        methods: {
            switchData(type){
                this.type = type
                this.getGoodsData()
                this.getUsersData()
                this.getOrdersData()
                this.getOrdersMoney()
                this.getRechargeMoney()
                this.getDepositMoney()
                this.getConveyReward()
                this.getChildReward()
                this.getUserBanlance()
            },
            //获取商品总量
            getGoodsData(){
                fetchData('/home/getGoodCount?type='+this.type).then(res => {
                    this.goodsData = res.data
                })
            },
            //获取用户总量
            getUsersData(){
                fetchData('/home/getUserCount?type='+this.type).then(res => {
                    this.userssData = res.data
                })
            },
            //获取订单总量
            getOrdersData(){
                fetchData('/home/getConveyCount?type='+this.type).then(res => {
                    this.ordersData = res.data
                })
            },
            //获取订单总金额
            getOrdersMoney(){
                fetchData('/home/getConveyMoney?type='+this.type).then(res => {
                    this.orderMoneyData = res.data
                })
            },
            //获取充值金额表
            getRechargeMoney(){
                fetchData('/home/getRechargeMoney?type='+this.type).then(res => {
                    this.rechargeMoney = res.data
                })
            },
            //获取用户提现
            getDepositMoney(){
                fetchData('/home/getDepositMoney?type='+this.type).then(res => {
                    this.depositMoney = res.data
                })
            },
            //获取抢单佣金
            getConveyReward(){
                fetchData('/home/getConveyReward?type='+this.type).then(res => {
                    this.conveyReward = res.data
                })
            },
            //获取下级返佣
            getChildReward(){
                fetchData('/home/getChildReward?type='+this.type).then(res => {
                    this.childReward = res.data
                })
            },
            //获取用户总余额
            getUserBanlance(){
                fetchData('/home/getUserBanlance?type='+this.type).then(res => {
                    this.userBanlance = res.data
                })
            }
        }
    }

</script>


<style scoped>
    .store-total-container{
        padding: 15px 25px;
        line-height: 2em;
        color: #fff;
        font-size: 14px;
    }
    .store-total-container > div:nth-child(2) {
        font-size: 26px;
        line-height: 36px;
        font-weight: bold;
    }
    .store-total-container .num2 {
        font-size: 20px;
        font-weight: bold;
        line-height: 100%;
    }
    .store-total-item1{
        background: linear-gradient(-125deg,#57bdbf,#2f9de2);
    }
    .store-total-item2{
        background: linear-gradient(-125deg,#ff7d7d,#fb2c95);
    }
    .store-total-item3{
        background: linear-gradient(-113deg,#c543d8,#925cc3);
    }
    .store-total-item4{
        background: linear-gradient(-113deg,#8e8cb3,#2219d0);
    }
    .store-total-item5{
        background: linear-gradient(-141deg,#ecca1b,#f39526);
    }
    .store-total-item6{
        background: linear-gradient(-141deg,#ec4b1b,#f39526);
    }
    .store-total-item7{
        background: linear-gradient(-141deg,#963064,#8a0920);
    }
    .store-total-item8{
        background: linear-gradient(-141deg,#1bec78,#155623);
    }
    .store-total-item9{
        background: linear-gradient(-141deg,#ea7575,#abd6c6);
    }
    .store-total-item10{
        background: linear-gradient(-141deg,#2f3331,#565115);
    }
</style>
