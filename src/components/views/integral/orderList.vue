<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商品积分记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="商品名称">
                    <el-input placeholder="请输入商品名称" v-model="searchObj.goodName"></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <el-select placeholder="所有分类" v-model="searchObj.type" class="handle-select mr10" clearble>
                        <el-option label="所有分类" value=""></el-option>
                        <el-option v-for="(item,index) in cateList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button @click="resetSearch">重置</el-button>
                    <el-button>导出</el-button>
                  </el-form-item>
                  <el-form-item style="float: right;">
                      <el-button type="primary" @click="addGoods">新增</el-button>
                  </el-form-item>
                </el-form>
            </div> -->
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="商品ID" width="90" align="center"></el-table-column>
                <el-table-column prop="goodsName" label="商品名称"  width="300" show-overflow-tooltip></el-table-column>
                <el-table-column prop="goodsPrice" label="商品分类">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type == 1">现金商品</span>
                        <span v-if="scope.row.type == 2">积分商品</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="商品状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">待发货</span>
                        <span v-if="scope.row.status == 2">已发货</span>
                        <span v-if="scope.row.status == 3">已签收</span>
                    </template>
                </el-table-column>
                <el-table-column prop="nickName" label="用户名">
                    <template slot-scope="scope">{{scope.row.nickName}}</template>
                </el-table-column>
                <el-table-column prop="price" label="商品价格">
                    <template slot-scope="scope">￥{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column prop="num" label="数量">
                    <template slot-scope="scope">{{scope.row.num}}</template>
                </el-table-column>
                <el-table-column prop="amount" label="总金额">
                    <template slot-scope="scope">￥{{scope.row.amount}}</template>
                </el-table-column>
                <el-table-column prop="goodsPic" label="商品图片" show-overflow-tooltip>
                    <template slot-scope="scope"><img style="width: 100px;height: 49px;" :src="scope.row.goodsPic"></template>
                </el-table-column>
                <el-table-column prop="addtime" label="兑换时间"></el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <!-- <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button> -->
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

        <el-dialog title="修改记录" :visible.sync="orderVisible" width="50%">
            <editOrder v-if="orderVisible" :orderVisible="orderVisible" @update:orderVisible="val => orderVisible = val" :dataItem="curDataObj" @orderSuccess="orderSuccess"></editOrder>
        </el-dialog>

    </div>
</template>

<script>
import { fetchData , deleteData } from '../../../api/index';
import editOrder from './editOrder'
export default {
    name: 'integralOrderList',
    components:{
        editOrder
    },
    data() {
        return {
            formInline: {
              user: '',
              region: ''
            },
            pageIndex: 1,
            pageSize: 10,
            pageTotal: 0,
            searchObj:{
                goodName:'',
                type:''
            },
            query: {
                goodName:'',
                type:''
            },
            tableData: [],
            cateList:[],
            editVisible: false,
            curDataObj:{},
            orderVisible:false
        };
    },
    created() {
        this.getData();
        //this.getTypeList();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(`/xy-shop-order/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
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
            this.query.goodName = this.searchObj.goodName
            this.query.type = this.searchObj.type
            this.getData();
        },
        // 触发重置按钮
        resetSearch() {
            this.pageIndex = 1
            this.query.goodName = this.searchObj.goodName = ""
            this.query.type = this.searchObj.type = ""
            this.getData();
        },
        addGoods(){
            this.$router.push('/integralAdd')
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/xy-shop-goods-list/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.curDataObj = row
            this.orderVisible = true
            //this.$router.push({path:'/integralAdd',query: {id:row.id}})
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getData();
        },
        //订单编辑成功
        orderSuccess(){
            this.orderVisible = false
            this.$message.success('操作成功')
            this.getData();
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
