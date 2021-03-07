<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="商品名称">{{form.goodsName}}</el-form-item>
          <el-form-item label="商品分类" prop="type">
            <span v-if="form.type == 1">现金商品</span>
            <span v-if="form.type == 2">积分商品</span>
          </el-form-item>
          <el-form-item label="用户名">{{form.nickName}}</el-form-item>
          <el-form-item label="商品价格">￥{{form.price}}</el-form-item>
          <el-form-item label="数量">{{form.num}}</el-form-item>
          <el-form-item label="总价">￥{{form.amount}}</el-form-item>
          <el-form-item label="兑换时间">{{form.amount}}</el-form-item>
          <el-form-item label="状态">
            <el-select placeholder="选择分类" v-model="form.status" clearble>
              <el-option label="待发货" :value="1"></el-option>
              <el-option label="已发货" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流单号" prop="express" v-if="form.status == 2">
            <el-input v-model="form.express" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { fetchData , postData , updateData} from '../../../api/index';
  import areaCode from "@/utils/areaCode"
export default {
    name: 'bankCardPop',
    props:['dataItem'],
    data() {
        return {
            form: {
            },
            ssqArr:[],
            areaOption:areaCode.areavalue, //地址编码选项
            addressId:'',
            rules:{
              express:[
                { required: true, message: '请输入物流单号', trigger: 'blur' },
              ],
              tel:[
                { required: true, message: '请输入开户电话', trigger: 'blur' },
              ],
              cardnum:[
                { required: true, message: '请输入银行卡号', trigger: 'blur' },
              ]
            },
        };
    },
    created() {
        this.form= JSON.parse(JSON.stringify(this.dataItem))
        this.getAddressByUid()
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateData(`/xy-shop-order/update`,this.form).then(res => {
              this.$emit('orderSuccess')
            });
          }
        });
      },
      getAddressByUid(){
        fetchData(`/xy-bankinfo/find?uid=${this.dataItem.id}`).then(res => {
            if(res.data && res.data.id){
              this.addressId = res.data.id
              this.form.id = res.data.id
              this.form.username = res.data.username
              this.form.bankname = res.data.bankname
              this.form.tel = res.data.tel
              this.form.cardnum = res.data.cardnum
              this.form.site = res.data.site
            }
        });
      },
      cancel(){
        this.$emit('update:orderVisible',false)
      },
      handleChange(val){
        this.form.province = val[0]
        this.form.city = val[1]
        this.form.county = val[2]
        let labelArr =  this.$refs['myCascader'].getCheckedNodes()[0].pathLabels
        if (labelArr[2]) {
          this.form.area = labelArr[2]
        }
      }
    }
};
</script>

<style scoped>

</style>
