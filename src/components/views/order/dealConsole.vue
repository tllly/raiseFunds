<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 交易控制
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="银行卡列表" prop="bankId">
                <el-select v-model="form.bankId" placeholder="请选择" @change="selectBankChange">
                  <el-option v-for="(item,index) in bankList" :label="item.bankname" :value="item.id"></el-option>
                </el-select>
                <el-button style="margin-left: 20px;" type="primary" @click="addBankCard" v-has="'JYKZQR'">添加银行卡</el-button>
              </el-form-item>
              <el-form-item label="收款银行卡号">
                <el-input v-model="curBank.cardnum" disabled></el-input>
              </el-form-item>
              <el-form-item label="收款人">
                <el-input v-model="curBank.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="所属银行">
                <el-input v-model="curBank.bankname" disabled></el-input>
              </el-form-item>
              <el-form-item label="银行地址">
                <el-input v-model="curBank.site" disabled></el-input>
              </el-form-item>
              <el-form-item label="提现手续费比例" prop="content">
                <el-input type="number" v-model="form.content"></el-input>
              </el-form-item>
              <!-- <el-form-item label="推荐好友返佣">
                <div v-for="(item,index) in ruleArr" :key="index">
                    邀请好友
                    <el-input v-model="item.min" size="mini" style="width: 80px;"></el-input> 至
                    <el-input v-model="item.max" size="mini" style="width: 80px;"></el-input>
                    人&nbsp;&nbsp;&nbsp;
                    反佣百分比
                    <el-input v-model="item.count" size="mini" style="width: 150px;"></el-input>
                    %&nbsp;&nbsp;&nbsp;
                    <i class="el-icon-delete" style="color: red;cursor: pointer;" @click="reduceRule(index)"></i>&nbsp;
                    <i class="el-icon-circle-plus-outline" style="color: #409EFF;cursor: pointer;" @click="addRule"></i>
                </div>
                <i class="el-icon-circle-plus-outline" style="color: #409EFF;cursor: pointer;" v-if="ruleArr.length == 0" @click="addRule"></i>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" v-if="loginUserObj.agentId == 0"  v-has="'JYKZQR'">确认</el-button>
                <!-- <el-button @click="cancel">取消</el-button> -->
              </el-form-item>
            </el-form>
        </div>
        <el-dialog title="添加银行卡" :visible.sync="bankVisible" width="50%">
            <el-form ref="formBank" :model="formBank" :rules="rulesBank" label-width="120px">
              <el-form-item label="收款银行卡号" prop="cardnum">
                <el-input v-model="formBank.cardnum"></el-input>
              </el-form-item>
              <el-form-item label="收款人姓名" prop="username">
                <el-input v-model="formBank.username"></el-input>
              </el-form-item>
              <el-form-item label="所属银行" prop="bankname">
                <el-input v-model="formBank.bankname"></el-input>
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
import { fetchData , postData } from '../../../api/index';
export default {
    name: 'dealConsole',
    data() {
        return {
            loginUserObj:JSON.parse(localStorage.getItem('userObj')).val,//当前登录用户对象
            form:{
                bankId:'',
                content:''
            },
            rules:{
                bankId:[
                    { required: true, message: '请选择银行卡', trigger: 'change' },
                ],
                content: [
                    { required: true, message: '请输入团队交易佣金', trigger: 'blur' }
                ],
            },
            bankList:[],
            curBank:{},

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
                    { required: true, message: '请输入所属银行', trigger: 'blur' }
                ],
                site: [
                    { required: true, message: '请输入开户行地址', trigger: 'blur' }
                ],
            },
            bankVisible:false,
            ruleArr:[
                {
                  min:10,
                  max:50,
                  count:3
                }
            ]
        };
    },
    created() {
        this.getData()
        this.checkYongJinSys()
    },
    methods: {
        // 获取银行卡列表数据数据
        getData() {
            fetchData(`/xy-bankinfo/XyBankinfo/currentPage/1/pageSize/100?userId=0`).then(res => {
                let dataArr = res.data.records
                for (var i = 0; i < dataArr.length; i++) {
                    if(dataArr[i].isCheck == 1){
                        this.curBank = dataArr[i]
                        this.form.bankId = dataArr[i].id
                        break
                    }
                }
                this.bankList = res.data.records
            });
        },
        //查询交易佣金
        checkYongJinSys(){
            fetchData(`/xy-index-msg/find?id=14`).then(res => {
                this.form.content = res.data.content
            });
        },
        //选择银行
        selectBankChange(val){
            for (var i = 0; i < this.bankList.length; i++) {
                if(this.bankList[i].id == val){
                    this.curBank = this.bankList[i]
                    break
                }
            }
        },
        //添加规则
        addRule(){
            this.ruleArr.push({
              min:'',
              max:'',
              count:''
            })
        },
          //删除规则
        reduceRule(index){
            this.ruleArr.splice(index, 1);
        },
        //添加银行卡
        addBankCard(){
            this.bankVisible = true
        },
        confirmAddBank(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    postData('/xy-bankinfo/add',this.formBank).then(res=>{
                        this.bankVisible = false
                        this.getData()
                    })
                }
            })
        },
        cancelAddbank(){
            this.$refs['formBank'].resetFields()
            this.bankVisible = false
        },
        cancel(){
            this.$router.go(-1)
        },
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    fetchData(`/xy-bankinfo/upHomeBank?bankId=${this.form.bankId}&content=${this.form.content}`).then(res=>{
                        this.$message.success('操作成功')
                    })
                }
            })
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
