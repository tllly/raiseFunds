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
export default {
    name: 'billPop',
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
        
    },
    methods: {
        
    }
};
</script>

<style scoped>

</style>
