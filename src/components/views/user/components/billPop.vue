<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="item" label="#" width="180"></el-table-column>
            <el-table-column prop="value" label="总" width="180"></el-table-column>
            <el-table-column prop="lastvue" label="当日"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { fetchData , postData , updateData} from '../../../../api/index';
export default {
    name: 'billPop',
    props:['dataItem'],
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.getBillData()
    },
    methods: {
        getBillData(){
            fetchData(`/xy-users/getUserBill?userId=${this.dataItem.id}`).then(res => {
                let arr = [{
                    item: '充值',
                    value: res.data.allRecharge.toFixed(2),
                    lastvue: res.data.todayRecharge.toFixed(2)
                }, {
                    item: '提现',
                    value: res.data.allDeposit.toFixed(2),
                    lastvue: res.data.todayDeposit.toFixed(2)
                }, {
                    item: '盈亏',
                    value: res.data.allProfit.toFixed(2),
                    lastvue: res.data.todayProfit.toFixed(2)
                }, {
                    item: '投注',
                    value: res.data.allBet.toFixed(2),
                    lastvue: res.data.todayBet.toFixed(2)
                },{
                    item: '帐变',
                    value: res.data.zchange.toFixed(2),
                    lastvue: ""
                },{
                    item: '团队余额',
                    value: res.data.teamMoney.toFixed(2),
                    lastvue:""
                }]
                this.tableData = arr
                // let aa = {
                //     allBet: 0,
                //     allDeposit: 0,
                //     allProfit: 18620,
                //     allRecharge: 0,
                //     id: 1567,
                //     teamMoney: 1754177.0199999956,
                //     todayBet: 0,
                //     todayDeposit: 0,
                //     todayProfit: 0,
                //     todayRecharge: 0,
                //     zchange: 0
                // }
                // this.tableData = res.data.records
                // this.pageTotal = res.data.total
            });
        }
    }
};
</script>

<style scoped>

</style>
