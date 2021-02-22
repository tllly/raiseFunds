<template>
    <div>
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="等级名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="会员等级(请勿修改)">
            <el-input v-model="form.loginPassWord"></el-input>
          </el-form-item>
          <el-form-item label="升级价格">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="接单限制">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="佣金比例">
            <el-input v-model="form.loginPassWord"></el-input>
          </el-form-item>
          <el-form-item label="提现次数">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="提现最小限制">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="提现最大限制">
            <el-input v-model="form.loginPassWord"></el-input>
          </el-form-item>
          <el-form-item label="用户余额限制">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="自动升级需邀请">
            <el-input v-model="form.name"></el-input>
            <p>邀请几个人 会自动升级到该等级</p>
          </el-form-item>
          <el-form-item label="提现至少完成订单/天">
            <el-input v-model="form.loginPassWord"></el-input>
            <p>提现需要完成 几笔订单才开提现 / 天</p>
          </el-form-item>
          <el-form-item label="提现手续费">
            <el-input v-model="form.tel"></el-input>
            <p>提现手续费,不用百分比,直接写小数,如: 0.01</p>
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
              loginPassWord:'',
              tel:''
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
/deep/ .el-form-item{
  margin-bottom: 8px !important
}
</style>
