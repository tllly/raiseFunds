<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 添加商品分类
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="佣金比例" prop="bili">
              <p>(不要设置百分比直接写0.01)</p>
              <el-input v-model="form.bili"></el-input>
            </el-form-item>
            
            <!-- <el-form-item label="分类LOGO" prop="catePic">
              <el-input type="number" v-model="form.catePic"></el-input>
            </el-form-item> -->
            <el-form-item label="分类简介" prop="cateInfo">
              <!-- <quill-editor ref="myTextEditor" v-model="form.cateInfo" :options="editorOption"></quill-editor> -->
              <el-input v-model="form.cateInfo"></el-input>
            </el-form-item>
            <el-form-item label="最低金额限制" prop="min">
              <el-input type="number" v-model="form.min"></el-input>
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
  import { fetchData , postData , updateData} from '../../../api/index';
  // import 'quill/dist/quill.core.css';
  // import 'quill/dist/quill.snow.css';
  // import 'quill/dist/quill.bubble.css';
  // import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'addGate',
    // components: {
    //     quillEditor
    // },
    data() {
        return {
            editId:null,
            editorOption: {
                placeholder: '请输入商品描述'
            },
            form: {
              name:'',
              bili:'',
              min:0,
              catePic:'4561231',
              cateInfo:'',
            },
            cateList:[],
            rules: {
              name:[
                { required: true, message: '请输入分类名称', trigger: 'blur' },
              ],
              bili: [
                { required: true, message: '请输入佣金比例', trigger: 'blur' }
              ],
              min: [
                { required: true, message: '请输入最低金额限制', trigger: 'blur' }
              ],
              catePic: [
                { required: true, message: '请上传分类LOGO', trigger: 'blur' }
              ],
              cateInfo: [
                { required: true, message: '请输入分类简介', trigger: 'blur' }
              ],
            }
        };
    },
    created(){
      if(this.$route.query.id){
        this.editId = this.$route.query.id
        this.getGoodsDetail()
      }
    },
    methods: {
      //获取上详情
      getGoodsDetail(){
        fetchData(`/xy-goods-cate/find?id=${this.editId}`).then(res => {
          this.form.name = res.data.name
          this.form.bili = res.data.bili
          this.form.min = res.data.min
          this.form.catePic = res.data.catePic
          this.form.cateInfo = res.data.cateInfo
          this.form.id = res.data.id
        });
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.editId){
              updateData(`/xy-goods-cate/update`,this.form).then(res => {
                this.$message.success('操作成功')
                this.$router.go(-1)
              });
            }else{
              postData(`/xy-goods-cate/add`,this.form).then(res => {
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
