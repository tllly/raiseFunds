<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item label="收货人姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="收货手机" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="省市区" prop="province">
              <el-cascader
                  ref="myCascader"
                  v-model="ssqArr"
                  :options="areaOption"
                  @change="handleChange">
              </el-cascader>
              <input type="hidden" v-model="form.province">
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="form.address"></el-input>
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
    name: 'deductPop',
    props:['dataItem'],
    data() {
      var checkPhone = (rule,value,callback) => {
            if(!value) {
                    return callback(new Error('手机号不能为空'));
                }else{
                    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
                if(reg.test(value)) {
                    callback();
                }else{
                    return callback(new Error('请输入正确的手机号'));
                }
            }
        }
        return {
            form: {
              name: '',
              tel:'',
              address:'',
              uid:'',
              province:'',
              city:'',
              county:'',
              area:''
            },
            ssqArr:[],
            areaOption:areaCode.areavalue, //地址编码选项
            addressId:'',
            rules:{
              tel:[
                { required: true, validator: checkPhone, trigger: 'blur' },
              ],
              address:[
                { required: true, message: '请输入详细地址', trigger: 'blur' },
              ],
              province:[
                { required: true, message: '请选择省市区', trigger: 'change' },
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
              updateData(`/xy-member-address/update`,this.form).then(res => {
                this.$emit('addressSuccess')
              });
            }else{
              postData(`/xy-member-address/add`,this.form).then(res => {
                this.$emit('addressSuccess')
              });
            }
          }
        });
      },
      getAddressByUid(){
        fetchData(`/xy-member-address/find?uid=${this.dataItem.id}`).then(res => {
            if(res.data && res.data.id){
              this.addressId = res.data.id
              this.form.id = res.data.id
              this.form.name = res.data.name
              this.form.tel = res.data.tel
              this.form.address = res.data.address
              this.form.province = parseInt(res.data.province)
              this.form.city = parseInt(res.data.city)
              this.form.county = parseInt(res.data.county)
              this.form.area = res.data.area
              this.ssqArr = [this.form.province ,this.form.city,this.form.county]
            }
        });
      },
      cancel(){
        this.$emit('update:addressVisible',false)
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
