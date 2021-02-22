<template>
    <div>
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="收货姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="收货手机">
            <el-input v-model="form.loginPassWord"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="form.tel"></el-input>
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

</style>
