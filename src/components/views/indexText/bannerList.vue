<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 轮播图列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item style="float: right;">
                      <el-button type="primary" @click="addGoods">新增</el-button>
                  </el-form-item>
                </el-form>
            </div>
            <el-table
                :data="cateList"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="image" label="图片">
                    <template slot-scope="scope"><img :src="scope.row.image" style="width: 100px;height: 49px;" @click="onPreview(scope.row.image)"></template>
                </el-table-column>
                <el-table-column prop="url" label="url"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <el-image-viewer 
         v-if="showViewer" 
         :on-close="closeViewer" 
         :url-list="[url]" />
    </div>
</template>

<script>
import { fetchData , deleteData } from '../../../api/index';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
export default {
    name: 'noticeList',
    components: {
        ElImageViewer
    },
    data() {
        return {
            formInline: {
              user: '',
              region: ''
            },
            showViewer: false, // 显示查看器
            url:'',
            pageIndex: 1,
            pageSize: 10,
            pageTotal: 0,
            searchObj:{
                goodName:'',
                type:''
            },
            query: {
                goodName:'',
                type:''
            },
            //tableData: [],
            cateList:[],
            editVisible: false,
        };
    },
    // created() {
    //     this.getTypeList();
    // },
    mounted(){
        this.getTypeList();
    },
    methods: {
        onPreview(val) {
            if(!val){
              this.$message.error('暂无图片')
              return
            }
            this.url = val
            this.showViewer = true
        },
          // 关闭查看器
        closeViewer() {
            this.showViewer = false
        },
        // 获取商品分类列表
        getTypeList(){
            fetchData(`/xy-banner/XyBanner/currentPage/${this.pageIndex}/pageSize/10`).then(res => {
                this.cateList = res.data.records
                this.pageTotal = res.data.total
            });
        },
        addGoods(){
            this.$router.push('/bannerAdd')
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/xy-banner/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getTypeList()
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$router.push({path:'/upDatebanner',query: {id:row.id}})
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getTypeList();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
