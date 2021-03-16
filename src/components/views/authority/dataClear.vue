<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 数据清理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" label-width="170px">
              <el-form-item label="选择要清理的数据项：">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="用户"></el-checkbox>
                    <el-checkbox label="订单(交易)"></el-checkbox>
                    <el-checkbox label="财务记录"></el-checkbox>
                    <el-checkbox label="充值"></el-checkbox>
                    <el-checkbox label="提现"></el-checkbox>
                    <el-checkbox label="银行卡信息"></el-checkbox>
                    <el-checkbox label="地址"></el-checkbox>
                    <el-checkbox label="物流"></el-checkbox>
                    <el-checkbox label="活动记录"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" v-has="'XTYHSCSYSJ'">确认</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { fetchData , postData ,deleteData} from '../../../api/index';
export default {
    name: 'dealConsole',
    data() {
        return {
            loginUserObj:JSON.parse(localStorage.getItem('userObj')).val,//当前登录用户对象
            checkList:[],
            baseData:[
                {
                    name:'用户',
                    key:'1'
                },
                {
                    name:'订单(交易)',
                    key:'2'
                },
                {
                    name:'财务记录',
                    key:'3'
                },
                {
                    name:'充值',
                    key:'4'
                },
                {
                    name:'提现',
                    key:'5'
                },
                {
                    name:'银行卡信息',
                    key:'6'
                },
                {
                    name:'地址',
                    key:'7'
                },
                {
                    name:'物流',
                    key:'8'
                },
                {
                    name:'活动记录',
                    key:'9'
                },
            ]
        };
    },
    created() {
    },
    methods: {
        onSubmit(){
            if(this.checkList.length == 0){
                this.$message.error('请选择要清理的数据项');
                return
            }
            let data = []
            this.checkList.forEach(item => {
                for (var i = 0; i < this.baseData.length; i++) {
                    if(this.baseData[i].name == item){
                        data.push(this.baseData[i].key)
                        break;
                    }
                }
            })
            this.$confirm('确定要清除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/sysUser/deleteAll?numbers=${data.join(',')}`).then(res=>{
                    this.$message.success('操作成功')
                    this.checkList = []
                })
            }).catch(() => {});
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
