<template>
    <div>
        <div class="searchBox">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="用户名称">
                <el-input placeholder="请输入用户名称"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="注册时间">
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
        <div>
            <el-tabs v-model="tabActiveName" type="card" @tab-click="handleClick">
                <el-tab-pane label="他的下线" name="first"></el-tab-pane>
                <el-tab-pane label="一级会员" name="second"></el-tab-pane>
                <el-tab-pane label="二级会员" name="third"></el-tab-pane>
                <el-tab-pane label="三级会员" name="fourth"></el-tab-pane>
            </el-tabs>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="item" label="ID"></el-table-column>
            <el-table-column prop="value" label="账号"></el-table-column>
            <el-table-column prop="lastvue" label="余额"></el-table-column>
            <el-table-column prop="item" label="佣金"></el-table-column>
            <el-table-column prop="value" label="充值"></el-table-column>
            <el-table-column prop="lastvue" label="提现"></el-table-column>
            <el-table-column prop="item" label="级别"></el-table-column>
            <el-table-column prop="value" label="上级用户"></el-table-column>
            <el-table-column prop="lastvue" label="直推人数"></el-table-column>
            <el-table-column prop="item" label="注册时间"></el-table-column>
            <el-table-column prop="value" label="操作"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'billPop',
    data() {
        return {
            tabActiveName:"first",
            tableData: []
        };
    },
    created() {
        
    },
    methods: {
        handleSearch(){

        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style scoped>
.searchBox{
    margin-top: -20px;
}

</style>
