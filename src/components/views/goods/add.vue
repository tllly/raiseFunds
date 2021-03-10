<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 添加商品
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="商品分类" prop="cid">
              <el-select placeholder="选择分类" v-model="form.cid" clearble>
                <el-option v-for="(item,index) in cateList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="form.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称" prop="shopName">
              <el-input v-model="form.shopName"></el-input>
            </el-form-item>
            <el-form-item label="商家所在区域" prop="province">
              <el-cascader
                  ref="myCascader"
                  v-model="ssqArr"
                  :options="areaOption"
                  @change="handleChange">
              </el-cascader>
              <input type="hidden" v-model="form.province">
            </el-form-item>
            <el-form-item label="商家详细地址" prop="shopAddr">
              <el-input v-model="form.shopAddr"></el-input>
            </el-form-item>
            <el-form-item label="商品单价" prop="goodsPrice">
              <el-input type="number" v-model="form.goodsPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品佣金比率" prop="commission">
              <el-input type="number" v-model="form.commission"></el-input>
            </el-form-item>
            <el-form-item label="送达天数" prop="day">
              <el-input type="number" v-model="form.day"></el-input>
              <!-- <el-date-picker v-model="form.day" type="date" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker> -->
            </el-form-item>
            <el-form-item label="商品图片" prop="goodsPic">
              <img v-if="form.goodsPic" @click="uploadImg" :src="form.goodsPic" style="width: 100px;height: 100px;">
              <el-button v-else type="primary" @click="uploadImg">上传图片</el-button>
              <input type="file" name="" style="display: none" id="uploadFile" @change="imgSelect">
              <input type="hidden" v-model="form.goodsPic">
            </el-form-item>
            <el-form-item label="商品描述" prop="goodsInfo">
              <quill-editor ref="myTextEditor" v-model="form.goodsInfo" :options="editorOption"></quill-editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
  import { fetchData , postData , updateData , imgUpload} from '../../../api/index';
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
  import areaCode from "@/utils/areaCode"
export default {
    name: 'editPop',
    components: {
        quillEditor
    },
    data() {
        return {
            editId:null,
            editorOption: {
                placeholder: '请输入商品描述'
            },
            pickerOptions: { //控制时间范围
                disabledDate (time) {
                    return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
                }
            },
            form: {
              cid:'',
              goodsName:'',
              shopName:'',
              shopAddr:'',
              goodsPrice:0,
              commission:'',
              day:'',
              goodsPic:null,
              goodsInfo:'',
              province:'',
              city:'',
              county:''
            },
            ssqArr:[],
            areaOption:areaCode.areavalue, //地址编码选项
            cateList:[],
            rules: {
              cid:[
                { required: true, message: '请选择商品分类', trigger: 'change' },
              ],
              goodsName:[
                { required: true, message: '请输入商品名称', trigger: 'blur' },
              ],
              shopName: [
                { required: true, message: '请输入店铺名称', trigger: 'blur' }
              ],
              shopAddr: [
                { required: true, message: '请输入商家详细地址', trigger: 'blur' }
              ],
              province:[
                { required: true, message: '请选择商家所在区域', trigger: 'change' }
              ],
              goodsPrice: [
                { required: true, message: '请输入商品单价', trigger: 'blur' }
              ],
              commission:[
                { required: true, message: '请输入商品佣金比率', trigger: 'blur' }
              ],
              day:[
                { required: true, message: '请输入送达天数', trigger: 'change' }
              ],
              goodsPic: [
                { required: true, message: '请上传商品图片', trigger: 'blur' }
              ],
              goodsInfo: [
                { required: true, message: '请输入商品描述', trigger: 'blur' }
              ],
            }
        };
    },
    created(){
      if(this.$route.query.id){
        this.editId = this.$route.query.id
        this.getGoodsDetail()
      }else{
        this.getTypeList()
      }
    },
    methods: {
      // 获取商品分类列表
      getTypeList(){
        fetchData(`/xy-goods-cate/XyGoodsCate/currentPage/1/pageSize/1000`).then(res => {
            this.cateList = res.data.records
        });
      },
      //获取上详情
      getGoodsDetail(){
        fetchData(`/xy-goods-list/find?id=${this.editId}`).then(res => {
          this.form.cid = res.data.cid
          this.form.goodsName = res.data.goodsName
          this.form.shopName = res.data.shopName
          this.form.shopAddr = res.data.shopAddr
          this.form.goodsPrice = res.data.goodsPrice
          this.form.commission = res.data.commission
          this.form.day = res.data.day
          this.form.province = parseInt(res.data.province)
          this.form.city = parseInt(res.data.city)
          this.form.county = parseInt(res.data.county)
          this.ssqArr = [this.form.province,this.form.city,this.form.county]
          this.form.goodsPic = res.data.goodsPic
          this.form.goodsInfo = res.data.goodsInfo
          this.form.id = res.data.id
          this.getTypeList()
        });
      },
      //选择图片
      uploadImg(){
        document.getElementById('uploadFile').click()
      },
      imgSelect(obj){
        let file = obj.currentTarget.files[0]
        let fileParam = new FormData()
        fileParam.append('file', file)
        imgUpload(`/api/addCommonUpload`,fileParam).then(res => {
          if(res.code == 200){
            this.form.goodsPic = res.data
          }
        })
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.editId){
              updateData(`/xy-goods-list/update`,this.form).then(res => {
                this.$message.success('操作成功')
                this.$router.go(-1)
              });
            }else{
              postData(`/xy-goods-list/add`,this.form).then(res => {
                this.$message.success('操作成功')
                this.$router.go(-1)
              });
            }
          }
        });
      },
      handleChange(val){
        this.form.province = val[0]
        this.form.city = val[1]
        this.form.county = val[2]
        // let labelArr =  this.$refs['myCascader'].getCheckedNodes()[0].pathLabels
        // if (labelArr[2]) {
        //   this.form.area = labelArr[2]
        // }
      },
      cancel(){
        this.$router.go(-1)
      }
    }
};
</script>

<style scoped>

</style>
