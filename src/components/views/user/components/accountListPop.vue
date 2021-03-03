<template>
    <div>
        <div class="searchBox">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="类型">
                <el-select placeholder="所有类型" v-model="searchObj.type" class="handle-select mr10" clearble>
                    <el-option key="0" label="系统" value="0"></el-option>
                    <el-option key="1" label="充值" value="1"></el-option>
                    <el-option key="2" label="交易" value="2"></el-option>
                    <el-option key="3" label="返佣" value="3"></el-option>
                    <el-option key="4" label="强制交易" value="4"></el-option>
                    <el-option key="5" label="推广返佣" value="5"></el-option>
                    <el-option key="6" label="下级交易返佣" value="6"></el-option>
                    <el-option key="7" label="提现" value="7"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发生时间">
                <el-date-picker
                  v-model="daterangeValue"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="resetSearch">重置</el-button>
              </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="oid" label="账号"></el-table-column>
            <el-table-column prop="oid" label="订单编号"></el-table-column>
            <el-table-column prop="num" label="金额"></el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 0">系统</span>
                    <span v-if="scope.row.type == 1">充值</span>
                    <span v-if="scope.row.type == 2">交易</span>
                    <span v-if="scope.row.type == 3">返佣</span>
                    <span v-if="scope.row.type == 4">强制交易</span>
                    <span v-if="scope.row.type == 5">推广返佣</span>
                    <span v-if="scope.row.type == 6">下级交易返佣</span>
                    <span v-if="scope.row.type == 7">提现</span>
                    <span v-if="scope.row.type == 8">活动</span>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="收支类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 2">支出</span>
                    <span v-if="scope.row.status == 1">收入</span>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.state == 0">启用</span>
                    <span v-if="scope.row.state == 1">删除</span>
                    <span v-if="scope.row.state == -1">禁用</span>
                </template>
            </el-table-column>
            <el-table-column prop="addtime" label="发生时间"></el-table-column>
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
    import { fetchData , deleteData , updateData } from '../../../../api/index';
export default {
    name: 'accountListPop',
    props:['dataItem'],
    data() {
        return {
            aaa:'',
            daterangeValue:[],
            pageIndex:1,
            pageSize:10,
            searchObj:{
                type:''
            },
            query: {
                type:'',
                startTime:'',
                endTime:'',
                uid:''
            },
            tableData: [],
            pageTotal: 0
        };
    },
    created() {
        this.query.uid = this.dataItem.id
        this.getData()
    },
    methods: {
        // 获取数据
        getData() {
            fetchData(`/xy-balance-log/XyBalanceLog/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.pageIndex = 1
            this.query.type = this.searchObj.type
            if(this.daterangeValue){
                this.query.startTime = this.daterangeValue[0]
                this.query.endTime = this.daterangeValue[1]
            }
            this.getData();
        },
        // 触发重置按钮
        resetSearch() {
            this.pageIndex = 1
            this.query.type = this.searchObj.type = ""
            this.daterangeValue = null
            this.query.startTime = ""
            this.query.endTime = ""
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getData();
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
