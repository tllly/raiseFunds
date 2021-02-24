<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="开户人">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="开户银行" prop="bankname">
            <el-input v-model="form.bankname"></el-input>
          </el-form-item>
          <el-form-item label="开户电话" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="cardnum">
            <el-input v-model="form.cardnum"></el-input>
          </el-form-item>
          <el-form-item label="开户地址" prop="site">
            <el-input v-model="form.site"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { fetchData , postData , updateData} from '../../../../api/index';
  import areaCode from "@/utils/areaCode"
export default {
    name: 'bankCardPop',
    props:['dataItem'],
    data() {
        return {
            form: {
              username: '',
              bankname:'',
              tel:'',
              uid:'',
              cardnum:'',
              site:''
            },
            ssqArr:[],
            areaOption:areaCode.areavalue, //地址编码选项
            addressId:'',
            rules:{
              bankname:[
                { required: true, message: '请输入开户银行', trigger: 'blur' },
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
        this.form.uid = this.dataItem.id
        this.getAddressByUid()
    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.addressId){
              updateData(`/xy-bankinfo/update`,this.form).then(res => {
                this.$emit('bankCardSuccess')
              });
            }else{
              postData(`/xy-bankinfo/add`,this.form).then(res => {
                this.$emit('bankCardSuccess')
              });
            }
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
        this.$emit('update:bankCardVisible',false)
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
