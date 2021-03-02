<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="登录用户账号" prop="account">
            <el-input v-model="form.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="新的登录密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="重复登录密码" prop="passwordRepeat">
            <el-input type="password" v-model="form.passwordRepeat"></el-input>
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
    name: 'passwordPop',
    props:['dataItem'],
    data() {
        return {
            form: {
              account:'',
              password:'',
              passwordRepeat:'',
              id:''
            },
            roleArr:[],
            checkList:[],
            rules: {
              password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
              ],
              passwordRepeat:[
                { required: true, message: '请重复输入密码', trigger: 'blur' },
              ],
            }
        };
    },
    created() {
      this.form.id = this.dataItem.id
      //this.form.password = this.dataItem.password
      this.form.account = this.dataItem.account
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.form.password != this.form.passwordRepeat){
              this.$message.error('密码不一致');
              return
            }
            updateData(`/sysUser/update`,this.form).then(res => {
              if(res.code == 200){
                this.$emit('passwordSuccess')
              }else{
                this.$message.error(res.viewMsg);
              }
            });
          }
        });
      },
      //获取角色列表
      getRoleData() {
          fetchData(`/sys-role/all`).then(res => {
              this.roleArr = res.data
          });
      },
      //编辑时获取对象信息
      // getUserObj(){
      //   fetchData(`/sysUser/find?id=${this.dataItem.id}`).then(res => {
      //     this.form.account = res.data.account
      //     this.form.phone = res.data.phone
      //     this.form.mail = res.data.mail
      //     this.form.userDesc = res.data.userDesc
      //     this.form.password = ''
      //     if(res.data.roles && res.data.roles.length > 0){
      //       let arr = []
      //       res.data.roles.forEach(item => {
      //         arr.push(item.roleName)
      //       })
      //       this.checkList = arr
      //     }
      //   });
      // },
      cancel(){
        this.$emit('update:passwordVisible',false)
      }
    }
};
</script>

<style scoped>
  .checkBox{
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 10px;
  }
</style>
