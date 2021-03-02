<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="登录用户账号" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="用户联系手机" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="联系电子邮箱" prop="mail">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
          <el-form-item label="角色访问授权" prop="freezeBalance">
            <div class="checkBox">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(item,index) in roleArr" :label="item.roleName"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <el-form-item label="用户身份描述">
            <el-input type="textarea" v-model="form.userDesc"></el-input>
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
    name: 'addUserPop',
    props:['dataItem'],
    data() {
        return {
            form: {
              account:'',
              phone:'',
              mail:'',
              password:'123456',
              userDesc:'',
              roles:null,
              id:''
            },
            roleArr:[],
            checkList:[],
            rules: {
              account:[
                { required: true, message: '请输入用户账号', trigger: 'blur' },
              ],
            }
        };
    },
    created() {
        if(this.dataItem){
          this.form.id = this.dataItem.id
          this.getUserObj()
        }
        this.getRoleData()
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let selectedArr = this.roleArr.filter(item => this.checkList.indexOf(item.roleName) > -1)
            let roleArr = []
            selectedArr.forEach(item => {
              let obj = {}
              obj.id = item.id
              obj.roleName = item.roleName
              roleArr.push(obj)
            })
            this.form.roles = roleArr
            if(this.dataItem){
              updateData(`/sysUser/update`,this.form).then(res => {
                if(res.code == 200){
                  this.$emit('editSuccess')
                }else{
                  this.$message.error(res.viewMsg);
                }
              });
            }else{
              postData(`/sysUser/add`,this.form).then(res => {
                if(res.code == 200){
                  this.$emit('addSuccess')
                }else{
                  this.$message.error(res.viewMsg);
                }
              });
            }
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
      getUserObj(){
        fetchData(`/sysUser/find?id=${this.dataItem.id}`).then(res => {
          this.form.account = res.data.account
          this.form.phone = res.data.phone
          this.form.mail = res.data.mail
          this.form.userDesc = res.data.userDesc
          this.form.password = ''
          if(res.data.roles && res.data.roles.length > 0){
            let arr = []
            res.data.roles.forEach(item => {
              arr.push(item.roleName)
            })
            this.checkList = arr
          }
        });
      },
      cancel(){
        if(this.dataItem){
          this.$emit('update:editVisible',false)
        }else{
          this.$emit('update:addVisible',false)
        }
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
