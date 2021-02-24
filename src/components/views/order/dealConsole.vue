<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 交易控制
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="银行列表" prop="level">
                <el-select v-model="form.level" placeholder="请选择">
                  <el-option label="白银会员" :value="0"></el-option>
                  <el-option label="黄金会员" :value="1"></el-option>
                  <el-option label="铂金会员" :value="2"></el-option>
                  <el-option label="钻石会员" :value="3"></el-option>
                  <el-option label="蓝宝石会员" :value="4"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="收款银行卡号" prop="account">
                <el-input v-model="form.account" disabled></el-input>
              </el-form-item>
              <el-form-item label="收款人" prop="phone">
                <el-input v-model="form.phone" disabled></el-input>
              </el-form-item>
              <el-form-item label="所属银行" prop="balance">
                <el-input v-model="form.balance" disabled></el-input>
              </el-form-item>
              <el-form-item label="银行地址" prop="freezeBalance">
                <el-input v-model="form.freezeBalance" disabled></el-input>
              </el-form-item>
              <el-form-item label="团队交易佣金">
                <el-input type="number" v-model="form.casePwd"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">确认</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
export default {
    name: 'dealConsole',
    data() {
        return {
            form:{},
            rules:{},
        };
    },
    created() {
    },
    methods: {
        cancel(){

        },
        onSubmit(){

        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
