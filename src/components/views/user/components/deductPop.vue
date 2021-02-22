<template>
    <div>
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="用户名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="上级Id">
            <el-input v-model="form.superiorID"></el-input>
          </el-form-item>
          <el-form-item label="是否显示我的团队">
            <el-switch v-model="form.showTeam"></el-switch>
          </el-form-item>
          <el-form-item label="显示选项">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="充值" name="type"></el-checkbox>
              <el-checkbox label="提现" name="type"></el-checkbox>
              <el-checkbox label="推荐人数" name="type"></el-checkbox>
              <el-checkbox label="电话" name="type"></el-checkbox>
              <el-checkbox label="电话隐藏部分" name="type"></el-checkbox>
              <el-checkbox label="姓名" name="type"></el-checkbox>
              <el-checkbox label="注册时间" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="选择扣除人">
            <el-select v-model="form.deductPerson" placeholder="请选择" style="width: 100%">
              <el-option label="张三" value="1"></el-option>
              <el-option label="李四" value="2"></el-option>
              <el-option label="王五" value="3"></el-option>
              <el-option label="赵六" value="4"></el-option>
              <el-option label="刘七" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣除余额">
            <el-input type="number" v-model="form.deductMoney"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'deductPop',
    data() {
        return {
           form: {
              name: '',
              superiorID:'',
              showTeam:false,
              type:[],
              deductPerson:'',
              deductMoney:'',
            }
        };
    },
    created() {
        
    },
    methods: {
        
    }
};
</script>

<style scoped>

</style>
