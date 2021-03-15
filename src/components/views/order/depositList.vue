<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 提现列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="订单号">
                    <el-input placeholder="请输入订单号" v-model="searchObj.code"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名称">
                    <el-input placeholder="请输入用户名称" v-model="searchObj.userName"></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号码" v-model="searchObj.tel"></el-input>
                  </el-form-item> -->
                  <!-- <el-form-item label="使用状态">
                    <el-select placeholder="所有状态" v-model="searchObj.status" class="handle-select mr10" clearble>
                        <el-option label="所有状态" value=""></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="冻结" value="2"></el-option>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item label="发起时间">
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
                    <el-button @click="exportExcel">导出</el-button>
                  </el-form-item>
                  <!-- <el-form-item style="float: right;">
                      <el-button type="primary" @click="addGoods">新增</el-button>
                  </el-form-item> -->
                </el-form>
            </div>
            <div style="margin: -20px 0 10px;" v-has="'TXGLCZ'">
                <!-- <el-button type="primary">批量通过</el-button> -->
                <el-button type="danger" @click="checkList">批量驳回</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" label="全选" width="55" :selectable="checkSelect"></el-table-column>
                <el-table-column prop="code" label="订单号"  align="center" width="240"></el-table-column>
                <el-table-column prop="username" label="提现用户"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="num" label="提现金额"  show-overflow-tooltip>
                    <template slot-scope="scope">￥{{scope.row.num}}</template>
                </el-table-column>
                <el-table-column prop="shouxu" label="手续费"  show-overflow-tooltip>
                    <template slot-scope="scope">￥{{scope.row.shouxu}}</template>
                </el-table-column>
                <el-table-column prop="realNum" label="实际到账"  show-overflow-tooltip>
                    <template slot-scope="scope">￥{{scope.row.realNum}}</template>
                </el-table-column>
                <el-table-column prop="bankname" label="银行名称">
                    <template slot-scope="scope">{{scope.row.bankname}}</template>
                </el-table-column>
                <el-table-column prop="username" label="开户名称">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column prop="cardnum" label="银行卡号" width="200">
                    <template slot-scope="scope">{{scope.row.cardnum}}</template>
                </el-table-column>
                <el-table-column prop="tel" label="联系电话"  show-overflow-tooltip></el-table-column>
                
                <!-- <el-table-column prop="pic" label="打款凭证"  show-overflow-tooltip>
                    <template slot-scope="scope"><img :src="scope.row.pic" style="width: 100px;height: 49;"></template>
                </el-table-column> -->
                <el-table-column prop="createTime" label="发起时间"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="editTime" label="处理时间"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="type" label="方式"  show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="isVip" label="类型"  show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tag v-if="isVip" type="warning" effect="dark">VIP充值</el-tag>
                        <el-tag v-else type="success">普通充值</el-tag>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="endtime" label="二维码"  show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="status" label="订单状态"  show-overflow-tooltip>
                    <!-- <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">待处理</span>
                        <span v-if="scope.row.status == 2">审核通过</span>
                        <span v-if="scope.row.status == 3">审核不通过</span>
                    </template> -->
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope" v-if="scope.row.status == '待处理'">
                        <el-button
                            type="text"
                            @click="agree(scope.row)"
                            v-has="'TXGLCZ'"
                        >通过</el-button>
                        <el-button
                            type="text"
                            class="red"
                            @click="refuse(scope.row)"
                            v-has="'TXGLCZ'"
                        >驳回</el-button>
                    </template>
                </el-table-column>
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
        
    </div>
</template>

<script>
import { fetchData , deleteData , updateData , exportData} from '../../../api/index';
export default {
    name: 'depositList',
    data() {
        return {
            loginUserObj:JSON.parse(localStorage.getItem('userObj')).val,//当前登录用户对象
            formInline: {
              user: '',
              region: ''
            },
            pageIndex: 1,
            pageSize: 10,
            pageTotal: 0,
            daterangeValue:null,
            searchObj:{
                code:'',
                userName:'',
            },
            query: {
                code:'',
                userName:'',
                startTime:'',
                endTime:'',
            },
            tableData: [],
            editVisible: false,
            addVisible: false,
            multipleSelection:[]
        };
    },
    created() {
        this.getData();
        //this.getTypeList();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(`/xy-deposit/XyDeposit/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            });
        },
        handleSelectionChange(val){
            let _arr = []
            val.forEach(item => {
                _arr.push(item.id)
            })
            this.multipleSelection = _arr
        },
        checkSelect (row,index) {
            let isChecked = true;
            if (row.status == '待处理') {
                isChecked = true
            } else {
                isChecked = false
            }
            return isChecked
        },
        checkList(){
            if(this.multipleSelection.length == 0){
                this.$message.error('请选择操作项');
                return;
            }
            updateData(`/xy-deposit/checkList?ids=${this.multipleSelection.join(',')}&type=3`).then(res => {
                this.multipleSelection = []
                this.$message.success('操作成功');
                this.getData();
            });
        },
        // 获取商品分类列表
        // getTypeList(){
        //     fetchData(`/xy-goods-cate/XyGoodsCate/currentPage/1/pageSize/1000`).then(res => {
        //         this.cateList = res.data.records
        //     });
        // },
        // 触发搜索按钮
        handleSearch() {
            this.pageIndex = 1
            this.query.code = this.searchObj.code
            this.query.userName = this.searchObj.userName
            if(this.daterangeValue){
                this.query.startTime = this.daterangeValue[0]
                this.query.endTime = this.daterangeValue[1]
            }
            this.getData();
        },
        // 触发重置按钮
        resetSearch() {
            this.pageIndex = 1
            this.query.code = this.searchObj.code = ""
            this.query.userName = this.searchObj.userName = ""
            this.daterangeValue = null
            this.query.startTime = ""
            this.query.endTime = ""
            this.getData();
        },
        //导出数据
        exportExcel(){
            exportData(`/xy-deposit/exportDepositExcel/currentPage/${this.pageIndex}/pageSize/${this.pageTotal}`,this.query)
        },
        addGoods(){
            this.addVisible = true
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                // deleteData(`/xy-goods-list/delete?guid=${row.id}`).then(res=>{
                //     if(res.code == 200){
                //         this.$message.success('删除成功');
                //         this.tableData.splice(index, 1);
                //     }
                // })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            //this.$router.push({path:'/goodsEdit',query: {id:row.id}})
            this.editVisible = true
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getData();
        },
        agree(row){
            fetchData(`/xy-deposit/upDeposit?conId=${row.id}`).then(res => {
                this.$message.success('操作成功');
                this.getData();
            });
        },
        refuse(row){
            let data ={
                id:row.id,
                status:3
            }
            updateData(`/xy-deposit/update`,data).then(res => {
                this.$message.success('操作成功');
                this.getData();
            });
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
