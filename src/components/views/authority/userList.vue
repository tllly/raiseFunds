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
                  <el-form-item label="用户账号">
                    <el-input placeholder="请输入用户账号" v-model="searchObj.account"></el-input>
                  </el-form-item>
                  <el-form-item label="联系手机">
                    <el-input placeholder="请输入联系手机" v-model="searchObj.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="使用状态">
                    <el-select placeholder="所有状态" v-model="searchObj.status" class="handle-select mr10" clearble>
                        <el-option label="所有状态" value=""></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="冻结" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="注册时间">
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
                <el-table-column prop="account" label="用户账号"  align="center"></el-table-column>
                <el-table-column prop="phone" label="联系手机"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="loginNum" label="登录次数">
                    <template slot-scope="scope">￥{{scope.row.loginNum}}</template>
                </el-table-column>
                <el-table-column prop="status" label="使用状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">正常</span>
                        <span v-if="scope.row.status == 2">冻结</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="loginTime" label="登录时间"></el-table-column>
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
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <editPop v-if="editVisible" :editVisible="editVisible" @update:editVisible="val => editVisible = val" :dataItem="curDataObj" @editSuccess="editSuccess"></editPop>
        </el-dialog>
        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="50%">
            <editPop v-if="addVisible" :addVisible="addVisible" @update:addVisible="val => addVisible = val" @addSuccess="addSuccess"></editPop>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData , deleteData } from '../../../api/index';
import editPop from './components/editPop'
export default {
    name: 'userList',
    components:{
        editPop
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
            daterangeValue:null,
            searchObj:{
                account:'',
                phone:'',
                status:''
            },
            query: {
                account:'',
                phone:'',
                status:'',
                startTime:'',
                endTime:'',
            },
            tableData: [],
            //cateList:[],
            editVisible: false,
            addVisible: false
        };
    },
    created() {
        this.getData();
        //this.getTypeList();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(`/sysUser/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
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
            this.query.account = this.searchObj.account
            this.query.phone = this.searchObj.phone
            this.query.status = this.searchObj.status
            if(this.daterangeValue){
                this.query.startTime = this.daterangeValue[0]
                this.query.endTime = this.daterangeValue[1]
            }
            this.getData();
        },
        // 触发重置按钮
        resetSearch() {
            this.pageIndex = 1
            this.query.account = this.searchObj.account = ""
            this.query.phone = this.searchObj.phone = ""
            this.query.status = this.searchObj.status = ""
            this.daterangeValue = null
            this.query.startTime = ""
            this.query.endTime = ""
            this.getData();
        },
        addGoods(){
            //this.$router.push('/goodsAdd')
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
