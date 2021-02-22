<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 会员等级
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column prop="item" label="ID"></el-table-column>
                <el-table-column prop="value" label="名称"></el-table-column>
                <el-table-column prop="lastvue" label="图标"></el-table-column>
                <el-table-column prop="item" label="会员价格"></el-table-column>
                <el-table-column prop="value" label="佣金比例"></el-table-column>
                <el-table-column prop="lastvue" label="最小余额"></el-table-column>
                <el-table-column prop="item" label="接单次数"></el-table-column>
                <el-table-column prop="value" label="提现次数"></el-table-column>
                <el-table-column prop="lastvue" label="提现最小金额"></el-table-column>
                <el-table-column prop="item" label="提现最大金额"></el-table-column>
                <el-table-column prop="item" label="注册时间"></el-table-column>
                <el-table-column prop="value" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <levelEditPop></levelEditPop>
        </el-dialog>

    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import levelEditPop from './components/levelEditPop'
export default {
    name: 'userlevel',
    components:{
        levelEditPop
    },
    data() {
        return {
            editVisible:false,
            tableData: [{
                item: '充值',
                value: '0',
                lastvue: '3005'
            }, {
                item: '提现',
                value: '0',
                lastvue: '2,505'
            }, {
                item: '盈亏',
                value: '0',
                lastvue: '0'
            }, {
                item: '投注',
                value: '0',
                lastvue: '0'
            },{
                item: '帐变',
                value: '0',
                lastvue: ''
            },{
                item: '团队余额',
                value: '0',
                lastvue: ''
            }]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        //删除
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
            }).catch(() => {});
        },
    }
};
</script>

<style scoped>

</style>
