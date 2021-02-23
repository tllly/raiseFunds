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
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
            <el-form-item label="商品单价" prop="goodsPrice">
              <el-input type="number" v-model="form.goodsPrice"></el-input>
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
            form: {
              cid:'',
              goodsName:'',
              shopName:'',
              goodsPrice:0,
              goodsPic:null,
              goodsInfo:'',
            },
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
              goodsPrice: [
                { required: true, message: '请输入商品单价', trigger: 'blur' }
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
          this.form.goodsPrice = res.data.goodsPrice
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
      cancel(){
        this.$router.go(-1)
      }
    }
};
</script>

<style scoped>

</style>
