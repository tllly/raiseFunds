<template>
    <div style="margin-top: -20px;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="余额操作" name="first">
          <el-form ref="form" :model="balanceform" :rules="rules" label-width="80px">
            <el-form-item label="当前余额">
              {{dataItem.balance}}
            </el-form-item>
            <el-form-item label="操作类型">
              <el-select v-model="balanceform.type" placeholder="请选择">
                <el-option label="加余额" :value="1"></el-option>
                <el-option label="减余额" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作额度">
              <el-input type="numble" v-model="balanceform.sum" style="width: 215px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="操作明细" name="second">
          <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="oid" label="账号"></el-table-column>
              <el-table-column prop="oid" label="订单编号"></el-table-column>
              <el-table-column prop="num" label="金额"></el-table-column>
              <el-table-column prop="type" label="类型">
                  <template slot-scope="scope">
                      <span v-if="scope.row.type == 0">系统</span>
                      <span v-if="scope.row.type == 1">充值</span>
                      <span v-if="scope.row.type == 2">交易</span>
                      <span v-if="scope.row.type == 3">返佣</span>
                      <span v-if="scope.row.type == 4">强制交易</span>
                      <span v-if="scope.row.type == 5">推广返佣</span>
                      <span v-if="scope.row.type == 6">下级交易返佣</span>
                      <span v-if="scope.row.type == 7">提现</span>
                      <span v-if="scope.row.type == 8">活动</span>
                  </template>
              </el-table-column>
              <el-table-column prop="state" label="收支类型">
                  <template slot-scope="scope">
                      <span v-if="scope.row.status == 2">支出</span>
                      <span v-if="scope.row.status == 1">收入</span>
                  </template>
              </el-table-column>
              <el-table-column prop="state" label="状态">
                  <template slot-scope="scope">
                      <span v-if="scope.row.state == 0">启用</span>
                      <span v-if="scope.row.state == 1">删除</span>
                      <span v-if="scope.row.state == -1">禁用</span>
                  </template>
              </el-table-column>
              <el-table-column prop="addtime" label="发生时间"></el-table-column>
          </el-table>
          <div class="pagination">
              <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :current-page="pageIndex"
                  :page-size="pageSize"
                  :total="pageTotal"
                  @current-change="handlePageChange"
              ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import { fetchData , postData , updateData} from '../../../../api/index';
  //import areaCode from "@/utils/areaCode"
export default {
    name: 'balencePop',
    props:['dataItem'],
    data() {
        return {
            activeName:'first',
            balanceform:{
              id:'',
              sum:'',
              type:1
            },
            pageIndex:1,
            pageSize:10,
            query: {
              uid:'',
              type:'0'
            },
            tableData:[],
            rules:{
              sum:[
                { required: true, message: '请输入操作额度', trigger: 'blur' },
              ],
              type:[
                { required: true, message: '请输入详细地址', trigger: 'blur' },
              ],
            },
        };
    },
    created() {
        this.balanceform.id = this.dataItem.id
        this.query.uid = this.dataItem.id
        this.getDataList()
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateData(`/xy-users/updUserBalance`,this.balanceform).then(res => {
              //debugger
              this.$emit('balanceSuccess')
            });
          }
        });
      },
      cancel(){
        this.$emit('update:balanceVisible',false)
      },
      //获取交易记录
      getDataList() {
          fetchData(`/xy-balance-log/XyBalanceLog/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
              this.tableData = res.data.records
              this.pageTotal = res.data.total
          });
      },
      // 分页导航
      handlePageChange(val) {
          this.pageIndex = val
          this.getDataList();
      },
    }
};
</script>

<style scoped>

</style>
