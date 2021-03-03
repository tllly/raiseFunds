<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 添加商品分类
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div style="margin-top: -20px;">
          <el-form ref="form">
            <el-form-item label="每日签到固定奖励">
              <div>
                <el-radio v-model="form.type" :label="1">积分</el-radio> &nbsp;&nbsp;&nbsp; 
                送
                <el-input v-if="form.type==1" v-model="form.count" size="mini" style="width: 150px;"></el-input>
                <el-input v-else v-model="countTemp" size="mini" style="width: 150px;" disabled></el-input>
                积分
              </div>
              <div>
                <el-radio v-model="form.type" :label="2">余额</el-radio> &nbsp;&nbsp;&nbsp; 
                送
                <el-input v-if="form.type==2" v-model="form.count" size="mini" style="width: 150px;"></el-input>
                <el-input v-else v-model="countTemp" size="mini" style="width: 150px;" disabled></el-input>
                元
              </div>
            </el-form-item>
            <el-form-item label="连续签到额外奖励">
              <div v-if="form.type == 1">
                <el-checkbox v-model="isOpen">积分</el-checkbox> &nbsp;&nbsp;&nbsp; 
                第二天起递增奖励
                <el-input v-model="form.award" size="mini" :disabled="!isOpen" style="width: 150px;"></el-input>
                积分&nbsp;&nbsp;&nbsp;
                <el-input v-model="form.days" style="width: 180px;" :disabled="!isOpen">
                  <template slot="append">天后不再递增</template>
                </el-input>
              </div>
              <div v-if="form.type == 2">
                <el-checkbox v-model="isOpen">余额</el-checkbox> &nbsp;&nbsp;&nbsp; 
                第二天起递增奖励
                <el-input v-model="form.award" size="mini" :disabled="!isOpen" style="width: 150px;"></el-input>
                元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input v-model="form.days" style="width: 180px;" :disabled="!isOpen">
                  <template slot="append">天后不再递增</template>
                </el-input>
              </div>
            </el-form-item>
            <!-- <el-form-item label="活动说明">
              <el-input type="textarea" v-model="form.min"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">确定</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
  import { fetchData , postData , updateData , imgUpload} from '../../../api/index';
export default {
    name: 'addGate',
    props:['dataItem'],
    data() {
        return {
          form:{
            award: '',
            count: '',
            isOpen:'',
            type:'',
            days:'',
            status:'',
            id:'',
          },
          isOpen:'',
          countTemp:''
        };
    },
    created(){
      this.form.id = this.dataItem.id
      this.form.award = this.dataItem.award
      this.form.count = this.dataItem.count
      //this.form.isOpen = this.dataItem.isOpen = 1?true:false
      this.isOpen = this.dataItem.isOpen == 1?true:false
      this.form.type = this.dataItem.type
      this.form.days = this.dataItem.days
      this.form.status = this.dataItem.status
    },
    methods: {
      //获取上详情
      // getGoodsDetail(){
      //   fetchData(`/xy-goods-cate/find?id=${this.editId}`).then(res => {
          
      //   });
      // },
      onSubmit(formName){
        this.form.isOpen = this.isOpen ? 1 : 0
        updateData(`/activity-type/update`,this.form).then(res => {
          this.$message.success('操作成功')
          this.$emit('signSuccess')
          //this.$router.go(-1)
        });
      },
      cancel(){
        this.$emit('update:activeSignVisible',false)
      }
    }
};
</script>

<style scoped>
/deep/ .el-form-item__label{
  float: initial !important;
  font-weight: bold;
  font-size: 14px;
}
</style>
