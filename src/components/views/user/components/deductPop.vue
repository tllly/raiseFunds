<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="用户名称">
            <el-input v-model="dataItem.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="上级Id">
            <el-input v-model="dataItem.parentId" disabled></el-input>
          </el-form-item>
          <el-form-item label="是否显示我的团队">
            <el-switch v-model="showTeam" disabled></el-switch>
          </el-form-item>
          <el-form-item label="显示选项">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="充值" name="type" disabled></el-checkbox>
              <el-checkbox label="提现" name="type" disabled></el-checkbox>
              <el-checkbox label="推荐人数" name="type" disabled></el-checkbox>
              <el-checkbox label="电话" name="type" disabled></el-checkbox>
              <el-checkbox label="电话隐藏部分" name="type" disabled></el-checkbox>
              <el-checkbox label="姓名" name="type" disabled></el-checkbox>
              <el-checkbox label="注册时间" name="type" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="选择扣除人">
            <el-select v-model="form.deductPerson" placeholder="请选择">
              <el-option v-for="(item,index) in childList" :label="item.nickname" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣除余额" prop="depositNum">
            <el-input type="number" v-model="form.depositNum"></el-input>
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
              depositNum:''
            },
            rules:{
              depositNum:[
                  { required: true, message: '请输入扣除余额', trigger: 'blur' },
              ],
            },
            checkList:['充值','提现','推荐人数','电话','电话隐藏部分','姓名','注册时间'],
            showTeam:true,
            childList:[]
        };
    },
    created() {
        this.form.depositNum = this.dataItem.depositNum
        this.getGroup()
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              id:this.dataItem.id,
              depositNum:this.form.depositNum
            }
            updateData(`/xy-users/update`,data).then(res => {
              this.$emit('deductSuccess')
            });
          }
        });
      },
      getGroup(){
        fetchData(`/xy-users/getGroup?userId=${this.dataItem.id}&dept=1`).then(res=>{
          //debugger
          this.childList = res.data.child
        })
      },
      cancel(){
        this.$emit('update:deductVisible',false)
      }
    }
};
</script>

<style scoped>

</style>
