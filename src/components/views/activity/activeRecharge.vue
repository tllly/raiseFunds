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
            <el-form-item label="是否启用">
              <el-switch v-model="statusOpen"></el-switch>
            </el-form-item>
            <el-form-item label="奖励类型">
              <el-radio v-model="form.type" :label="1">余额</el-radio>
              <el-radio v-model="form.type" :label="2">积分</el-radio>
            </el-form-item>
            <el-form-item label="充值奖励规则">
              <div v-for="(item,index) in ruleArr" :key="index">
                当日单次充值达
                <el-input v-model="item.min" size="mini" style="width: 80px;"></el-input> 至
                <el-input v-model="item.max" size="mini" style="width: 80px;"></el-input>
                元&nbsp;&nbsp;&nbsp;
                奖励彩金
                <el-input v-model="item.count" size="mini" style="width: 150px;"></el-input>
                {{form.type == 1 ? '元' : '积分'}}&nbsp;&nbsp;&nbsp;
                <i class="el-icon-delete" style="color: red;cursor: pointer;" v-if="index != 0" @click="reduceRule(index)"></i>&nbsp;
                <i class="el-icon-circle-plus-outline" style="color: #409EFF;cursor: pointer;" @click="addRule"></i>
              </div>
              <i v-if="ruleArr.length == 0" class="el-icon-circle-plus-outline" style="color: #409EFF;cursor: pointer;" @click="addRule"></i>
            </el-form-item>
            <el-form-item label="活动图片">
              <img v-if="form.pic" @click="uploadImg" :src="form.pic" style="width: 100px;height: 100px;">
              <el-button v-else type="primary" @click="uploadImg">上传图片</el-button>
              <input type="file" name="" style="display: none" id="uploadFile" @change="imgSelect">
              <input type="hidden" v-model="form.pic">
            </el-form-item>
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
            type:'',
            id:'',
            pic:'',
          },
          isOpen:'',
          countTemp:'',
          statusOpen:'',
          ruleArr:[]
        };
    },
    created(){
      this.form.id = this.dataItem.id
      this.form.pic = this.dataItem.pic
      this.form.type = this.dataItem.type
      this.statusOpen = this.dataItem.status == 1?true:false
      this.getRuleList()
    },
    methods: {
      //获取上详情
      // getGoodsDetail(){
      //   fetchData(`/xy-goods-cate/find?id=${this.editId}`).then(res => {
          
      //   });
      // },
      uploadImg(){
        document.getElementById('uploadFile').click()
      },
      imgSelect(obj){
        let file = obj.currentTarget.files[0]
        let fileParam = new FormData()
        fileParam.append('file', file)
        imgUpload(`/api/addCommonUpload`,fileParam).then(res => {
          if(res.code == 200){
            this.form.pic = res.data
          }
        })
      },
      onSubmit(formName){
        // this.form.isOpen = this.isOpen ? 1 : 0
        // if(this.form.days == "" || this.form.days == 0){
        //   this.$message.error('请输入红包领取次数')
        //   return
        // }
        let flag = false
        let list = []
        for(let i = 0 ; i < this.ruleArr.length ; i++){
          let row = this.ruleArr[i]
          if(!row.min || !row.max || !row.count){
            this.$message.error('请填写完整的奖励规则')
            flag = true
            break;
          }
          let tempObj = {}
          tempObj.min = row.min
          tempObj.max = row.max
          tempObj.count = row.count
          tempObj.activityId = this.form.id
          list.push(tempObj)
        }
        if(flag){
          return
        }
        let data = {
          id:this.form.id,
          type:this.form.type,
          pic:this.form.pic,
          status:this.statusOpen ? 1 : 2,
          list:list
        }
        updateData(`/activity-type/upRecharge`,data).then(res => {
          this.$message.success('操作成功')
          this.$emit('rechargeSuccess')
        });
      },
      //添加规则
      addRule(){
        this.ruleArr.push({
          min:'',
          max:'',
          count:''
        })
      },
      //获取现有规则
      getRuleList(){
        fetchData(`/recharge-activity/all?activityId=${this.form.id}`).then(res => {
          //this.cateList = res.data.records
          if(res.data && res.data.length > 0){
            let _arr = []
            res.data.forEach(item => {
              _arr.push({
                id:item.id,
                min:item.min,
                max:item.max,
                activityId:item.activityId,
                count:item.count
              })
            })
            this.ruleArr = _arr
          }
        });
      },
      //删除规则
      reduceRule(index){
        this.ruleArr.splice(index, 1);
      },
      cancel(){
        this.$emit('update:activeRechargeVisible',false)
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
