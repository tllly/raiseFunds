<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> {{pageurl}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="跳转链接" prop="url">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="banner图片" prop="image">
              <img v-if="form.image" @click="uploadImg" :src="form.image" style="width: 100px;height: 49px;">
              <el-button v-else type="primary" @click="uploadImg">上传图片</el-button>
              <input type="file" name="" style="display: none" id="uploadFile" @change="imgSelect">
              <input type="hidden" v-model="form.image">
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
export default {
    name: 'noticeAdd',
    data() {
        return {
            pageurl:'添加轮播如',
            editId:null,
            editorOption: {
                placeholder: '请输入公告内容'
            },
            form: {
              url:'',
              image:'',
            },
            rules: {
              url:[
                { required: true, message: '请输入跳转链接', trigger: 'blur' },
              ],
              image: [
                { required: true, message: '请输选择图片', trigger: 'blur' }
              ],
            }
        };
    },
    created(){
      if(this.$route.query.id){
        this.editId = this.$route.query.id
        this.pageurl = "编辑轮播图"
        this.getGoodsDetail()
      }
    },
    methods: {
      //获取上详情
      getGoodsDetail(){
        fetchData(`/xy-banner/find?id=${this.editId}`).then(res => {
          this.form.url = res.data.url
          this.form.image = res.data.image
          this.form.id = res.data.id
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
            this.form.image = res.data
          }
        })
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // let obj = {}
            // obj.xyBanner = this.form
            if(this.editId){
              updateData(`/xy-banner/update`,this.form).then(res => {
                this.$message.success('操作成功')
                this.$router.go(-1)
              });
            }else{
              postData(`/xy-banner/add`,this.form).then(res => {
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
