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
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="store-total-container store-total-item1">
                        <div>商品总量</div>
                        <div>640</div>
                        <div>今日新增商品 <span class="num2">0</span></div>
                        <div>昨日新增商品 2</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="store-total-container store-total-item2">
                        <div>用户总量</div>
                        <div>259</div>
                        <div>今日新增用户 <span class="num2">0</span></div>
                        <div>昨日新增用户 2</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="store-total-container store-total-item3">
                        <div>订单总量</div>
                        <div>2</div>
                        <div>今日新增用户 <span class="num2">1</span></div>
                        <div>昨日新增用户 0</div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="store-total-container store-total-item4">
                        <div>订单总金额</div>
                        <div>156254</div>
                        <div>今日新增订单总金额 <span class="num2">4562</span></div>
                        <div>昨日新增订单总金额 0</div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="padding-top: 20px;">
                <el-col :span="4">
                    <div class="store-total-container store-total-item5">
                        <div>用户充值</div>
                        <div>156256485</div>
                        <div>今日新增充值 <span class="num2">4561245</span></div>
                        <div>昨日新增充值 456123</div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="store-total-container store-total-item6">
                        <div>用户提现</div>
                        <div>123456</div>
                        <div>今日新增提现 <span class="num2">4525</span></div>
                        <div>昨日新增提现 235</div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="store-total-container store-total-item7">
                        <div>抢单佣金</div>
                        <div>456</div>
                        <div>今日新增佣金 <span class="num2">152</span></div>
                        <div>昨日新增佣金 0</div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="store-total-container store-total-item8">
                        <div>下级返佣</div>
                        <div>0</div>
                        <div>今日新增佣金 <span class="num2">0</span></div>
                        <div>昨日新增佣金 0</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="store-total-container store-total-item9">
                        <div>用户总余额</div>
                        <div>45678645</div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                
            }
        },
        computed: {

        },
        created(){
            this.handleListener();
            this.changeDate();
        },
        methods: {

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
