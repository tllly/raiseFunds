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
            tableData: [{
                item: '充值',
                value: '0',
                lastvue: '3005'
            }, {
                item: '提现',
                value: '0',
                lastvue: '2,505'
            }, {
                item: '盈亏',
                value: '0',
                lastvue: '0'
            }, {
                item: '投注',
                value: '0',
                lastvue: '0'
            },{
                item: '帐变',
                value: '0',
                lastvue: ''
            },{
                item: '团队余额',
                value: '0',
                lastvue: ''
            }]
        };
    },
    created() {
        this.getBillData()
    },
    methods: {
        getBillData(){
            fetchData(`/xy-users/getUserBill?userId=${this.dataItem.id}`).then(res => {
                debugger
                // this.tableData = res.data.records
                // this.pageTotal = res.data.total
            });
        }
    }
};
</script>

<style scoped>

</style>
