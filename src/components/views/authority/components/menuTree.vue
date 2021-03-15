<template>
    <div>
      <div style="padding: 0 50px 15px;">
        <el-tree
          :data="treeData"
          ref="tree"
          show-checkbox
          node-key="id"
          check-strictly
          :default-checked-keys="selectedArr"
          :props="defaultProps">
        </el-tree>
      </div>
        <el-form ref="form" label-width="80px">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { fetchData , postData , updateData} from '../../../../api/index';
export default {
    name: 'menuTreePop',
    props:['dataItem'],
    data() {
        return {
            treeData: [],
            defaultProps: {
              children: 'childPermission',
              label: 'authorityName'
            },
            selectedArr:[],
        };
    },
    created() {
      // if(this.dataItem){
      //   this.form.roleName = this.dataItem.roleName
      //   this.form.des = this.dataItem.des
      //   this.form.id = this.dataItem.id
      // }
      this.getUserData()
      this.getTreeData()
    },
    methods: {
      onSubmit(){
        let TreeArr1 =  this.$refs.tree.getCheckedKeys()
        let TreeArr2 =this.$refs.tree.getHalfCheckedKeys()
        let TreeArr = TreeArr1.concat(TreeArr2)
        let data = {
          roleId:this.dataItem.id,
          roleName:this.dataItem.roleName,
          permissions:TreeArr
        }
        updateData(`/sys-role/upRole`,data).then(res => {
          if(res.code == 200){
            this.$emit('menuSuccess')
          }else{
            this.$message.error(res.viewMsg);
          }
        });
      },
      getUserData(){
          fetchData(`/sys-role/getRoleInfo?roleId=${this.dataItem.id}`).then(res => {
              let _arr = [] 
              if(res.data && res.data.permissions && res.data.permissions.length > 0){
                res.data.permissions.forEach(item => {
                  //if(item.isParent == 2){
                    _arr.push(item.id)
                  //}
                })
              }
              this.selectedArr = _arr
          });
      },
      getTreeData() {
          fetchData(`/sys-permission/getPermissionTree`).then(res => {
              this.treeData = res.data
          });
      },
      cancel(){
        this.$emit('update:menuVisible',false)
      }
    }
};
</script>

<style scoped>

</style>
