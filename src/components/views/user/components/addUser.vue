<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名称" prop="nickName">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="pwd">
            <el-input v-model="form.pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repwd">
            <el-input v-model="form.repwd"></el-input>
          </el-form-item>
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
    data() {
        var checkPhone = (rule,value,callback) => {
            if(!value) {
                    return callback(new Error('手机号不能为空'));
                }else{
                    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
                if(reg.test(value)) {
                    callback();
                }else{
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        }
        return {
            form: {
              nickName:'',
              tel:'',
              pwd:'',
              repwd:'',
              parentId:'',
            },
            rules: {
              nickName:[
                { required: true, message: '请输入用户名称', trigger: 'blur' },
              ],
              tel: [
                { required: true,validator: checkPhone, trigger: 'blur' }
              ],
              pwd:[
                { required: true, message: '请输入密码', trigger: 'blur' }
              ],
              repwd:[
                { required: true, message: '请输入确认密码', trigger: 'blur' }
              ],
             
            }
        };
    },
    created() {
    },
    methods: {
      onSubmit(formName){
        if(this.form.pwd != this.form.repwd){
          this.$message.error('确认密码不相同')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            postData(`/xy-users/registerUser`,this.form).then(res => {
              this.$emit('addSuccess')
            });
          }
        });
      },
      cancel(){
        this.$emit('update:addVisible',false)
      }
    }
};
</script>

<style scoped>

</style>
