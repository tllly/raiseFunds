<template>
    <div>
        <!-- <div class="searchBox">
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
        </div> -->
        <div v-if="layers && layers > 0">
            <el-tabs v-model="tabActiveName" type="card" @tab-click="handleClick">
                <el-tab-pane label="他的下线" name="0"></el-tab-pane>
                <el-tab-pane v-for="index of layers" :label="index+'级会员'" :name="index+''"></el-tab-pane>
            </el-tabs>
        </div>
        <el-table :data="childList" style="width: 100%">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column prop="balance" label="余额"></el-table-column>
            <el-table-column prop="item" label="佣金"></el-table-column>
            <el-table-column prop="rechargeNum" label="充值"></el-table-column>
            <el-table-column prop="depositNum" label="提现"></el-table-column>
            <!-- <el-table-column prop="item" label="级别"></el-table-column> -->
            <el-table-column prop="parentId" label="上级用户Id"></el-table-column>
            <el-table-column prop="childs" label="直推人数"></el-table-column>
            <el-table-column prop="addtime" label="注册时间"></el-table-column>
            <el-table-column prop="value" label="操作"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="pageIndex"
                :page-size="pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
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
            tabActiveName:"0",
            childList:[{}],
            layers: null,
            dept: 0,
            pageTotal: 0,
            pageSize: 10,
            pageIndex: 1
        };
    },
    created() {
        this.getGroup()
    },
    methods: {
        handleSearch(){

        },
        handlePageChange(val) {
            this.pageIndex = val
            this.getGroup();
        },
        handleClick(tab, event) {
            this.pageIndex = 1
            let _index = tab.index
            this.dept = tab.index
            this.getGroup()
        },
        getGroup(){
            fetchData(`/xy-users/getGroup?currentPage=${this.pageIndex}&pageSize=10&userId=${this.dataItem.id}&dept=${this.dept}`).then(res=>{
                if(this.dept == 0){
                    this.layers = res.data.layers
                }
              this.childList = res.data.pageAllChild
              this.pageTotal = res.data.allChild.length
            })
        },
    }
};
</script>

<style scoped>
.searchBox{
    margin-top: -20px;
}

</style>
