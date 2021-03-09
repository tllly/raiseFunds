<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 白名单列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item style="float: right;">
                      <el-button type="primary" @click="addGoods" v-has="'YJGLSZ'">新增</el-button>
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
                <el-table-column prop="max" label="目标金额">
                    <template slot-scope="scope">￥{{scope.row.max}}</template>
                </el-table-column>
                <el-table-column prop="money" label="佣金">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">发布</span>
                        <span v-if="scope.row.status == 1">未发布</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-has="'YJGLSZ'"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-has="'YJGLSC'"
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
        <!-- 添加白名单弹出框 -->
        <el-dialog :title="eidtId?'修改佣金规则':'添加佣金规则'" :visible.sync="addVisible" width="50%" :before-close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="目标金额" prop="max">
                  <el-input type="number" v-model="form.max"></el-input>
                </el-form-item>
                <el-form-item label="佣金" prop="money">
                  <el-input type="number" v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="是否发布">
                    <el-switch v-model="status"></el-switch>
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
import { fetchData , postData , deleteData , updateData} from '../../../api/index';
export default {
    name: 'whiteList',
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
              max:'',
              money:'',
              status:0
            },
            status:true,
            rules: {
              max:[
                { required: true, message: '请输入目标金额', trigger: 'blur' },
              ],
              money:[
                { required: true, message: '请输入佣金', trigger: 'blur' },
              ],
            },
            //tableData: [],
            cateList:[],
            addVisible: false,
            eidtId:null
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
            fetchData(`/teamBrokerage/XyMessage/currentPage/${this.pageIndex}/pageSize/10`).then(res => {
                this.cateList = res.data.records
                this.pageTotal = res.data.total
            });
        },
        addGoods(){
            this.eidtId = null
            this.addVisible = true
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/teamBrokerage/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getTypeList()
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.eidtId = row.id
            this.form.max = row.max
            this.form.money = row.money
            this.form.status = row.status
            this.status = row.status == 0 ? true : false
            this.addVisible = true
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getTypeList();
        },
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.status = this.status ? 0 : 1
                    if(this.eidtId){
                        this.form.id = this.eidtId
                        updateData(`/teamBrokerage/update`,this.form).then(res => {
                            if(res.code == 200){
                                this.$message.success('操作成功')
                                this.addVisible = false
                                this.getTypeList()
                            }else{
                                this.$message.error(res.viewMsg)
                            }
                        });
                    }else{
                        postData(`/teamBrokerage/add`,this.form).then(res => {
                            if(res.code == 200){
                                this.$message.success('操作成功')
                                this.addVisible = false
                                this.getTypeList()
                            }else{
                                this.$message.error(res.viewMsg)
                            }
                        });
                    }
                }
            });
        },
        handleClose(done){
            this.$refs['form'].resetFields()
            this.$refs['form'].clearValidate()
            done()
        },
        cancel(){
            this.addVisible = false
            this.$refs['form'].resetFields()
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
