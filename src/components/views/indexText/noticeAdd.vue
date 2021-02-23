<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> {{pageTitle}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="公告标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content">
              <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">发布公告</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
  import { fetchData , postData , updateData} from '../../../api/index';
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'noticeAdd',
    components: {
        quillEditor
    },
    data() {
        return {
            pageTitle:'添加公告',
            editId:null,
            editorOption: {
                placeholder: '请输入公告内容'
            },
            form: {
              title:'',
              content:'',
            },
            rules: {
              title:[
                { required: true, message: '请输入公告标题', trigger: 'blur' },
              ],
              content: [
                { required: true, message: '请输入公告内容', trigger: 'blur' }
              ],
            }
        };
    },
    created(){
      if(this.$route.query.id){
        this.editId = this.$route.query.id
        this.pageTitle = "编辑公告"
        this.getGoodsDetail()
      }
    },
    methods: {
      //获取上详情
      getGoodsDetail(){
        fetchData(`/xy-index-msg/find?id=${this.editId}`).then(res => {
          this.form.title = res.data.title
          this.form.content = res.data.content
          this.form.id = res.data.id
        });
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.editId){
              updateData(`/xy-index-msg/update`,this.form).then(res => {
                this.$message.success('操作成功')
                this.$router.go(-1)
              });
            }else{
              postData(`/xy-index-msg/add`,this.form).then(res => {
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
