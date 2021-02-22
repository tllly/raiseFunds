<template>
    <div>
        <div class="searchBox">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="类型">
                <el-select placeholder="所有类型" v-model="aaa" class="handle-select mr10" clearble>
                    <el-option key="1" label="系统" value="真人"></el-option>
                    <el-option key="2" label="充值" value="假人"></el-option>
                    <el-option key="3" label="交易" value="真人"></el-option>
                    <el-option key="4" label="返佣" value="假人"></el-option>
                    <el-option key="5" label="强制交易" value="真人"></el-option>
                    <el-option key="6" label="推广返佣" value="假人"></el-option>
                    <el-option key="7" label="下级交易返佣" value="假人"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发生时间">
                <el-date-picker
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
              </el-form-item>
            </el-form>
        </div>
        <!-- <div>
            <el-tabs v-model="tabActiveName" type="card" @tab-click="handleClick">
                <el-tab-pane label="他的下线" name="first"></el-tab-pane>
                <el-tab-pane label="一级会员" name="second"></el-tab-pane>
                <el-tab-pane label="二级会员" name="third"></el-tab-pane>
                <el-tab-pane label="三级会员" name="fourth"></el-tab-pane>
            </el-tabs>
        </div> -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="item" label="ID"></el-table-column>
            <el-table-column prop="value" label="账号"></el-table-column>
            <el-table-column prop="lastvue" label="订单编号"></el-table-column>
            <el-table-column prop="item" label="金额"></el-table-column>
            <el-table-column prop="value" label="类型"></el-table-column>
            <el-table-column prop="lastvue" label="状态"></el-table-column>
            <el-table-column prop="item" label="发生时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'billPop',
    data() {
        return {
            aaa:'',
            //tabActiveName:"first",
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
        handleSearch(){

        },
        // handleClick(tab, event) {
        //     console.log(tab, event);
        // }
    }
};
</script>

<style scoped>
.searchBox{
    margin-top: -20px;
}

</style>
