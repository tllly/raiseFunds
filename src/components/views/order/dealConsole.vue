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
                <el-button style="margin-left: 20px;" type="primary" @click="addBankCard" v-has="'JYKZQR'">银行卡管理</el-button>
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
              <el-form-item label="提现次数" prop="param1">
                <el-input type="number" v-model="form.param1"></el-input>
              </el-form-item>
              <el-form-item label="手续费比例" prop="param2">
                <el-input type="number" v-model="form.param2"></el-input>
              </el-form-item>
              <el-form-item label="最小金额" prop="param3">
                <el-input type="number" v-model="form.param3"></el-input>
              </el-form-item>
              <el-form-item label="最大金额" prop="param4">
                <el-input type="number" v-model="form.param4"></el-input>
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
        <el-dialog title="银行卡管理" :visible.sync="bankVisible" width="80%">
            <bankList v-if="bankVisible" @updateBankList="getData"></bankList>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData , postData } from '../../../api/index';
import bankList from './bankList'
export default {
    name: 'dealConsole',
    components:{
        bankList
    },
    data() {
        return {
            loginUserObj:JSON.parse(localStorage.getItem('userObj')).val,//当前登录用户对象
            form:{
                bankId:'',
                param1:'',
                param2:'',
                param3:'',
                param4:''
            },
            rules:{
                bankId:[
                    { required: true, message: '请选择银行卡', trigger: 'change' },
                ],
                param1: [
                    //{ required: true, message: '请输入免费次数', trigger: 'blur' }
                ],
                param2: [
                    //{ required: true, message: '请输入手续费比例', trigger: 'blur' }
                ],
                param3: [
                    //{ required: true, message: '请输入最小金额', trigger: 'blur' }
                ],
                param4: [
                    //{ required: true, message: '请输入最大金额', trigger: 'blur' }
                ]
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
            this.curBank = {}
            this.form.bankId = ''
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
            fetchData(`/sys-data/find?id=1`).then(res => {
                this.form.param1 = res.data.param1
                this.form.param2 = res.data.param2
                this.form.param3 = res.data.param3
                this.form.param4 = res.data.param4
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
        
        cancel(){
            this.$router.go(-1)
        },
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        bankId:this.form.bankId,
                        depositConfig:{
                            param1:this.form.param1,
                            param2:this.form.param2,
                            param3:this.form.param3,
                            param4:this.form.param4
                        }
                    }
                    postData(`/xy-bankinfo/upHomeBank`,data).then(res=>{
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
