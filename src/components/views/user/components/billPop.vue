<template>
    <div style="margin-top: -40px;">
        <el-tabs v-model="activeIndex" @tab-click="handleClick">
            <el-tab-pane label="近3天" name="3"></el-tab-pane>
            <el-tab-pane label="近7天" name="7"></el-tab-pane>
            <el-tab-pane label="近60天" name="60"></el-tab-pane>
        </el-tabs>
        <div class="tableBox">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="integral" label="积分"></el-table-column>
                <el-table-column prop="newPeople" label="新人红包"> </el-table-column>
                <el-table-column prop="reserveNum" label="已预订金额"> </el-table-column>
                <el-table-column prop="commission" label="佣金"> </el-table-column>
                <el-table-column prop="recharge" label="充值"> </el-table-column>
                <el-table-column prop="deposit" label="提现"> </el-table-column>
                <el-table-column prop="balance" label="账号余额" width="200"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import { fetchData , postData , updateData} from '../../../../api/index';
export default {
    name: 'billPop',
    props:['dataItem'],
    data() {
        return {
            tableData: [],
            activeIndex:'3'
        };
    },
    created() {
        this.getBillData()
    },
    methods: {
        getBillData(){
            fetchData(`/xy-users/getUserBill?uid=${this.dataItem.id}&date=${this.activeIndex}`).then(res => {
                // let arr = [{
                //     item: '充值',
                //     value: res.data.allRecharge.toFixed(2),
                //     lastvue: res.data.todayRecharge.toFixed(2)
                // }, {
                //     item: '提现',
                //     value: res.data.allDeposit.toFixed(2),
                //     lastvue: res.data.todayDeposit.toFixed(2)
                // }, {
                //     item: '盈亏',
                //     value: res.data.allProfit.toFixed(2),
                //     lastvue: res.data.todayProfit.toFixed(2)
                // }, {
                //     item: '投注',
                //     value: res.data.allBet.toFixed(2),
                //     lastvue: res.data.todayBet.toFixed(2)
                // },{
                //     item: '帐变',
                //     value: res.data.zchange.toFixed(2),
                //     lastvue: ""
                // },{
                //     item: '团队余额',
                //     value: res.data.teamMoney.toFixed(2),
                //     lastvue:""
                // }]
                let arr = res.data.list
                arr.push({})
                res.data.sumBill.balance = ("总计余额：" + res.data.sumBill.balance)
                arr.push(res.data.sumBill)
                this.tableData = arr
            });
        },
        handleClick(){
            // setTimeout(()=>{
                
            // },10)
            this.getBillData()
        }
    }
};
</script>

<style scoped>
    .tableBox{
        max-height: 500px;
        overflow-y: scroll;
    }
</style>
