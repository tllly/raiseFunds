<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="pwd">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="form.tel"></el-input>
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
    name: 'deductPop',
    props:['dataItem'],
    data() {
        return {
           form: {
              username: '',
              pwd:'',
              tel:'',
              isAgent:1,
              id:'',
              account:''
            },
            rules:{
              username:[
                  { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              pwd:[
                  { required: true, message: '请输入密码', trigger: 'blur' },
              ],
              tel:[
                  { required: true, message: '请输入手机号码', trigger: 'blur' },
              ]
            },
        };
    },
    created() {
        this.form.id = this.dataItem.id
        this.form.account = this.dataItem.username
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            postData(`/xy-users/upgradeAgency?id=${this.form.id}&tel=${this.form.tel}&account=${this.form.account}&username=${this.form.username}&pwd=${this.form.pwd}&isAgent=${this.form.isAgent}`).then(res => {
              this.$emit('agentSuccess')
            });
          }
        });
      },
      cancel(){
        this.$emit('update:agentVisible',false)
      }
    }
};
</script>

<style scoped>

</style>
