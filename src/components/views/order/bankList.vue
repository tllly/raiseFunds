<template>
    <div>
        <div class="searchBox">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item style="float: right;">
                  <el-button type="primary" @click="addBank" v-has="'JYKZQR'">新增</el-button>
              </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="bankname" label="开户行"></el-table-column>
            <el-table-column prop="cardnum" label="银行卡号"></el-table-column>
            <el-table-column prop="username" label="开户人"></el-table-column>
            <el-table-column label="是否默认">
                <template slot-scope="scope">
                    <span v-if="scope.row.isCheck == 1">系统默认</span>
                </template>
            </el-table-column>
            <el-table-column prop="site" label="开户地址"></el-table-column>
            <!-- <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.state == 0">启用</span>
                    <span v-if="scope.row.state == 1">删除</span>
                    <span v-if="scope.row.state == -1">禁用</span>
                </template>
            </el-table-column> -->
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="handleEdit(scope.row)"
                        v-has="'JYKZQR'"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.$index, scope.row)"
                        v-has="'JYKZQR'"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="eidtObj?'编辑银行卡':'添加银行卡'" :visible.sync="bankVisible" width="50%" append-to-body>
            <el-form ref="formBank" :model="formBank" :rules="rulesBank" label-width="120px">
              <el-form-item label="开户行" prop="bankname">
                <el-input v-model="formBank.bankname"></el-input>
              </el-form-item>
              <el-form-item label="收款银行卡号" prop="cardnum">
                <el-input v-model="formBank.cardnum"></el-input>
              </el-form-item>
              <el-form-item label="收款人姓名" prop="username">
                <el-input v-model="formBank.username"></el-input>
              </el-form-item>
              <el-form-item label="银行地址" prop="site">
                <el-input v-model="formBank.site"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="confirmAddBank('formBank')">确认</el-button>
                <el-button @click="cancelAddbank">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchData , deleteData , updateData,postData } from '../../../api/index';
export default {
    name: 'accountListPop',
    props:['dataItem'],
    data() {
        return {
            tableData: [],
            bankVisible:false,
            eidtObj:null,
            formBank:{
                cardnum:'',
                username:'',
                bankname:'',
                site:'',
                uid:0,
            }, //添加银行卡
            rulesBank:{
                cardnum:[
                    { required: true, message: '请输入银行卡号', trigger: 'blur' },
                ],
                username: [
                    { required: true, message: '请输入收款人姓名', trigger: 'blur' }
                ],
                bankname: [
                    { required: true, message: '请输入开户行', trigger: 'blur' }
                ],
                site: [
                    { required: true, message: '请输入开户行地址', trigger: 'blur' }
                ],
            },
        };
    },
    created() {
        this.getData()
    },
    methods: {
        // 获取银行卡列表数据数据
        getData() {
            fetchData(`/xy-bankinfo/XyBankinfo/currentPage/1/pageSize/100?userId=0`).then(res => {
                this.tableData = res.data.records
            });
        },
        addBank(){
            this.eidtObj = null
            this.bankVisible = true
        },
        confirmAddBank(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.eidtObj){
                        this.formBank.id = this.eidtObj.id
                        updateData('/xy-bankinfo/update',this.formBank).then(res=>{
                            this.$message.success('编辑成功');
                            this.$emit('updateBankList')
                            this.bankVisible = false
                            this.getData()
                        })
                    }else{
                        postData('/xy-bankinfo/add',this.formBank).then(res=>{
                            this.$message.success('添加成功');
                            this.$emit('updateBankList')
                            this.bankVisible = false
                            this.getData()
                        })
                    }
                }
            })
        },
        cancelAddbank(){
            this.$refs['formBank'].resetFields()
            this.bankVisible = false
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/xy-bankinfo/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getData()
                        this.$emit('updateBankList')
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(row) {
            this.eidtObj = row
            this.formBank.cardnum = row.cardnum
            this.formBank.username = row.username
            this.formBank.bankname = row.bankname
            this.formBank.site = row.site
            this.bankVisible = true
        },
    }
};
</script>

<style scoped>
.searchBox{
    margin-top: -20px;
}
.red {
    color: #ff0000;
}
</style>
