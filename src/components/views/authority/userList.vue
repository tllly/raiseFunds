<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统用户列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
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
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="商品ID" width="90" align="center"></el-table-column>
                <el-table-column prop="goodsName" label="商品名称"  width="500" show-overflow-tooltip></el-table-column>
                <el-table-column prop="goodsPrice" label="商品价格">
                    <template slot-scope="scope">￥{{scope.row.goodsPrice}}</template>
                </el-table-column>
                <el-table-column prop="shopName" label="店铺名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="添加时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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
import { fetchData , deleteData } from '../../../api/index';
export default {
    name: 'basetable',
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
        };
    },
    created() {
        this.getData();
        this.getTypeList();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(`/xy-goods-list/XyGoodsList/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            });
        },
        // 获取商品分类列表
        getTypeList(){
            fetchData(`/xy-goods-cate/XyGoodsCate/currentPage/1/pageSize/1000`).then(res => {
                this.cateList = res.data.records
            });
        },
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
            this.$router.push('/goodsAdd')
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/xy-goods-list/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$router.push({path:'/goodsEdit',query: {id:row.id}})
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
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
