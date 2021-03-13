<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="des">
            <el-input v-model="form.des"></el-input>
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
              roleName:'',
              des:'',
            },
            rules: {
              roleName:[
                { required: true, message: '请输入权限名称', trigger: 'blur' },
              ],
              des: [
                { required: true, message: '请输入权限描述', trigger: 'blur' }
              ],
            }
        };
    },
    created() {
      if(this.dataItem){
        this.form.roleName = this.dataItem.roleName
        this.form.des = this.dataItem.des
        this.form.id = this.dataItem.id
      }
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.dataItem){
              updateData(`/sys-role/update`,this.form).then(res => {
                if(res.code == 200){
                  this.$emit('editSuccess')
                }else{
                  this.$message.error(res.viewMsg);
                }
              });
            }else{
              postData(`/sys-role/add`,this.form).then(res => {
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

</style>
