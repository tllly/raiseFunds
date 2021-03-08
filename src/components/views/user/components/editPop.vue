<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="账号余额" prop="balance">
            <el-input type="number" v-model="form.balance"></el-input>
          </el-form-item>
          <el-form-item label="冻结金额" prop="freezeBalance">
            <el-input type="number" v-model="form.freezeBalance"></el-input>
          </el-form-item>
          <el-form-item label="会员等级" prop="level">
            <el-select v-model="form.level" placeholder="请选择" style="width: 100%">
              <el-option label="白银会员" :value="0"></el-option>
              <el-option label="黄金会员" :value="1"></el-option>
              <el-option label="铂金会员" :value="2"></el-option>
              <el-option label="钻石会员" :value="3"></el-option>
              <el-option label="蓝宝石会员" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="登录密码">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="交易密码">
            <el-input v-model="form.casePwd"></el-input>
          </el-form-item> -->
          <el-form-item label="上级Id">
            <el-input v-model="form.parentId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { fetchData , postData , updateData} from '../../../../api/index';
export default {
    name: 'editPop',
    props:['dataItem'],
    data() {
        return {
            form: {
              username:'',
              tel:'',
              balance:0,
              freezeBalance:0,
              level:'',
              //pwd:'',
              casePwd:'',
              parentId:'',
              id:''
            },
            rules: {
              username:[
                { required: true, message: '请输入用户名称', trigger: 'blur' },
              ],
              tel: [
                { required: true, message: '请输入手机号码', trigger: 'blur' }
              ],
              balance: [
                { required: true, message: '请输入账号余额', trigger: 'blur' }
              ],
              freezeBalance: [
                { required: true, message: '请输入冻结金额', trigger: 'blur' }
              ],
              level: [
                { required: true, message: '请至少会员等级', trigger: 'change' }
              ],
            }
        };
    },
    created() {
        this.form.username = this.dataItem.username
        this.form.tel = this.dataItem.tel
        this.form.balance = this.dataItem.balance
        this.form.freezeBalance = this.dataItem.freezeBalance
        this.form.level = this.dataItem.level
        //this.form.pwd = this.dataItem.pwd
        this.form.casePwd = this.dataItem.casePwd
        this.form.parentId = this.dataItem.parentId
        this.form.id = this.dataItem.id
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.dataItem.casePwd && this.form.casePwd == this.dataItem.casePwd){
              this.form.casePwd = null
            }
            updateData(`/xy-users/update`,this.form).then(res => {
              this.form.casePwd = this.dataItem.casePwd
              this.$emit('editSuccess')
            });
          }
        });
      },
      cancel(){
        this.$emit('update:editVisible',false)
      }
    }
};
</script>

<style scoped>

</style>
