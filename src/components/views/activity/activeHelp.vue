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
              <!-- <el-radio v-model="form.type" :label="1">金钱</el-radio> -->
              <el-radio v-model="form.type" :label="2">积分</el-radio>
            </el-form-item>
            <el-form-item label="助力规则">
              <div class="ruleBoxScrool">
                <div v-for="(item,index) in ruleArr" :key="index">
                  充值金额达
                  <el-input v-model="item.min" size="mini" style="width: 80px;"></el-input>
                  元&nbsp;&nbsp;&nbsp;
                  奖励
                  <el-input v-model="item.count" size="mini" style="width: 80px;"></el-input>
                  {{form.type == 1 ? '元' : '积分'}}&nbsp;&nbsp;&nbsp;
                  助力次数
                  <el-input v-model="item.num" size="mini" style="width: 80px;"></el-input>
                  <i class="el-icon-delete" style="color: red;cursor: pointer;" v-if="index != 0" @click="reduceRule(index)"></i>&nbsp;
                  <i class="el-icon-circle-plus-outline" style="color: #409EFF;cursor: pointer;" @click="addRule"></i>
                </div>
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
          if(!row.min || !row.num || !row.count){
            this.$message.error('请填写完整的奖励规则')
            flag = true
            break;
          }
          let tempObj = {}
          tempObj.min = row.min
          tempObj.count = row.count
          tempObj.num = row.num
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
          this.$emit('helpSuccess')
        });
      },
      //添加规则
      addRule(){
        this.ruleArr.push({
          min:'',
          num:'',
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
                num:item.num,
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
        this.$emit('update:helpVisible',false)
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
.ruleBoxScrool{
  overflow-y: scroll;
  max-height: 200px;
}
.ruleBoxScrool::-webkit-scrollbar {
    width: 4px;
    cursor: pointer;
    border-radius: 4px;
}
.ruleBoxScrool::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(19, 210, 219, .5);
    cursor: pointer;
}
.ruleBoxScrool::-webkit-scrollbar-track {
    border-radius: 4px;
    background: rgba(255,255,255, 0.2);
    cursor: pointer;
}
</style>
