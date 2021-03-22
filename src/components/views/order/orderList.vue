<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单列表
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
                  <!-- <el-form-item label="使用状态">
                    <el-select placeholder="所有状态" v-model="searchObj.status" class="handle-select mr10" clearble>
                        <el-option label="所有状态" value=""></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="冻结" value="2"></el-option>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item label="下单时间">
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
                    <!-- <el-button>导出</el-button> -->
                  </el-form-item>
                  <!-- <el-form-item style="float: right;">
                      <el-button type="primary" @click="addGoods">新增</el-button>
                  </el-form-item> -->
                </el-form>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="code" label="订单号"  align="center" width="250" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nickname" label="用户名"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.goodsName}}</template>
                </el-table-column>
                <el-table-column prop="goodsName" label="商品单价" show-overflow-tooltip>
                    <template slot-scope="scope">￥{{scope.row.goodsPrice}}</template>
                </el-table-column>
                <el-table-column prop="goodsCount" label="交易数量" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.goodsCount}}</template>
                </el-table-column>
                <el-table-column prop="num" label="交易数额"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="commission" label="佣金"  show-overflow-tooltip>
                    <template slot-scope="scope">￥{{scope.row.commission}}</template>
                </el-table-column>
                <el-table-column prop="addtime" label="下单时间"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="endtime" label="解冻时间"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="交易状态"  show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">待付款</span>
                        <span v-if="scope.row.status == 1">交易完成</span>
                        <span v-if="scope.row.status == 2">用户取消</span>
                        <span v-if="scope.row.status == 3">强制完成</span>
                        <span v-if="scope.row.status == 4">强制取消</span>
                        <span v-if="scope.row.status == 5">交易冻结</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="checkwl(scope.row)"
                        >查看物流</el-button>

                        <el-button
                            type="text"
                            @click="editTime(scope.row)"
                            v-if="scope.row.status == 1 && scope.row.isCheck == 1 && loginUserObj.agentId == 0"
                            v-has="'DDXG'"
                        >修改到货时间</el-button>
                        <!-- <el-button
                            v-if="scope.row.status == 0"
                            type="text"
                            class="red"
                            @click="qxdd(scope.row)"
                        >取消订单</el-button>
                        <el-button
                            v-if="scope.row.status == 5"
                            type="text"
                            @click="jywc(scope.row)"
                        >手动解冻</el-button> -->
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
        <el-dialog title="物流信息" :visible.sync="wuliuVisible" width="50%">
            <div>
                <!-- <p class="wlTitle">物流信息：</p> -->
                <div style="padding: 0 20px;">
                    <el-timeline>
                        <el-timeline-item
                          v-for="(activity, index) in TracesList"
                          :key="index"
                          :color="index == 0 ? '#5680fa' : ''"
                          size="large"
                          :timestamp="activity.date + ' ' + activity.time">
                          {{activity.content}}  ({{activity.status}})
                        </el-timeline-item>
                    </el-timeline>
                </div>
                <div v-if="TracesList.length == 0" style="padding: 100px 0;color:#999999;text-align: center;">
                    暂无物流跟踪信息
                </div>
          </div>
        </el-dialog>
        <el-dialog title="修改到货时间" :visible.sync="timeVisible" width="35%">
            <el-form  label-width="80px">
                <!-- <el-form-item label="签收天数">
                    <el-input placeholder="请输入用户名称" v-model="dateValue" style="width: 200px;"></el-input>
                </el-form-item> -->
                <el-form-item label="到货日期" prop="createTime">
                 <el-date-picker v-model="signTime" type="datetime" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                  <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData , deleteData , updateData } from '../../../api/index';
export default {
    name: 'orderList',
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
            TracesList: [{
                AcceptTime:'fdsafd',
                AcceptStation:'fdsafdsa'
            },{
                AcceptTime:'fdsafd',
                AcceptStation:'fdsafdsa'
            },{
                AcceptTime:'fdsafd',
                AcceptStation:'fdsafdsa'
            },{
                AcceptTime:'fdsafd',
                AcceptStation:'fdsafdsa'
            }],
            wuliuVisible: false,
            editVisible: false,
            addVisible: false,
            timeVisible: false, //修改到货时间
            signTime:'',
            dateId:'',
            pickerOptions: { //控制时间范围
                disabledDate (time) {
                    return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
                }
            }
        };
    },
    created() {
        this.getData();
        //this.getTypeList();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(`/xy-convey/XyConvey/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
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
        onSubmit(){
            if(!this.signTime){
                this.$message.error('请输入到货日期');
                return
            }
            let data = {
                id:this.dateId,
                signTime:this.signTime
            }
            updateData(`/xy-convey/update`,data).then(res => {
              this.$message.success('操作成功')
              this.getData();
              this.timeVisible = false
            });
        },
        cancel(){
            this.timeVisible = false
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
        checkwl(row){
            fetchData(`/xy-express-log/all?id=${row.id}`).then(res => {
                this.TracesList = res.data.reverse()
                this.wuliuVisible = true
            });
        },
        //修改到货时间
        editTime(row){
            this.signTime = row.signTime
            this.dateId = row.id
            this.timeVisible = true
        },
        //强制付款
        qzfk(row){
            let data ={
                id:row.id,
                status:5
            }
            this.updateStatus(data)
        },
        //取消订单
        qxdd(row){
            let data ={
                id:row.id,
                status:2
            }
            this.updateStatus(data)
        },
        //手动解冻
        sdjd(row){
            let data ={
                id:row.id,
                status:2
            }
            this.updateStatus(data)
        },
        //取消订单
        qxdd(row){
            let data ={
                id:row.id,
                status:4
            }
            this.updateStatus(data)
        },
        //交易完成
        jywc(row){
            let data ={
                id:row.id,
                status:1
            }
            this.updateStatus(data)
        },
        updateStatus(data){
            updateData(`/xy-convey/update`,data).then(res => {
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
.wlTitle{
    font-size: 16px;
    color: #333333;
    margin-top: -20px;
    padding: 0 10px;
    margin-bottom: 20px;
}
/deep/ .el-dialog__title{
    font-size: 18px;
    color: #666666;
}
/deep/ .el-dialog__header{
    border-bottom: 1px solid #e1e1e1;
}
/deep/ .el-timeline-item__content{
    color: #999999;
    font-size: 14px;
}
/deep/ .el-timeline-item__timestamp{
    color: #999999;
    font-size: 14px;
}
/deep/ .el-timeline li:first-child .el-timeline-item__content{
    color: #5680fa
}
/deep/ .el-timeline li:first-child .el-timeline-item__timestamp{
    color: #5680fa
}
/deep/ .el-timeline li:first-child .el-timeline-item__node::after{
    content: " ";
    position: absolute;
    top: -2px;
    left: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border:1px solid #5680fa;
}
</style>
