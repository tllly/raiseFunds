<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 消息列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item style="float: right;">
                      <el-button type="primary" @click="addGoods">新增</el-button>
                  </el-form-item>
                </el-form>
            </div>
            <el-table
                :data="cateList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="createTime" label="消息时间"></el-table-column>
                <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column> -->
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
        <!-- 添加白名单弹出框 -->
        <el-dialog title="添加白名单" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                  <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                  <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData , postData , deleteData } from '../../../api/index';
export default {
    name: 'messageList',
    data() {
        return {
            formInline: {
              user: '',
              region: ''
            },
            pageIndex: 1,
            pageSize: 10,
            pageTotal: 0,
            form: {
              title:'',
              content:''
            },
            rules: {
              title:[
                { required: true, message: '请输入标题', trigger: 'blur' },
              ],
              content:[
                { required: true, message: '请输入内容', trigger: 'blur' },
              ],
            },
            //tableData: [],
            cateList:[],
            addVisible: false,
        };
    },
    // created() {
    //     this.getTypeList();
    // },
    mounted(){
        this.getTypeList();
    },
    methods: {
        // 获取商品分类列表
        getTypeList(){
            fetchData(`/xy-message/XyMessage/currentPage/${this.pageIndex}/pageSize/10`).then(res => {
                this.cateList = res.data.records
                this.pageTotal = res.data.total
            });
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
                deleteData(`/white-list/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getTypeList()
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$router.push({path:'/upDatebanner',query: {id:row.id}})
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getTypeList();
        },
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    postData(`/xy-message/add`,this.form).then(res => {
                        if(res.code == 200){
                            this.$message.success('操作成功')
                            this.addVisible = false
                            this.getTypeList()
                        }else{
                            this.$message.error(res.viewMsg)
                        }
                        
                    });
                }
            });
        },
        cancel(){
            this.addVisible = false
            this.$refs['form'].clearValidate()
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
