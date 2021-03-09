<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 首页公告列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <!-- <el-form-item label="商品名称">
                    <el-input placeholder="请输入商品名称" v-model="searchObj.goodName"></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <el-select placeholder="所有分类" v-model="searchObj.type" class="handle-select mr10" clearble>
                        <el-option label="所有分类" value=""></el-option>
                        <el-option v-for="(item,index) in cateList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                    <el-button @click="resetSearch">重置</el-button>
                    <el-button>导出</el-button>
                  </el-form-item> -->
                  <el-form-item style="float: right;">
                      <el-button type="primary" @click="addGoods" v-has="'WBGLTJ'">新增</el-button>
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
                <el-table-column prop="id" label="ID" width="90" align="center"></el-table-column>
                <el-table-column prop="title" label="标题"  width="300" show-overflow-tooltip></el-table-column>
                <el-table-column prop="pic" label="背景图"  width="200" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <img :src="scope.row.pic" style="width: 100px;height: 49px;" @click="onPreview(scope.row.pic)">
                    </template>
                </el-table-column>
                <el-table-column label="内容简要" width="500" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-html="scope.row.content" class="htmlContent"></div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="cateInfo" label="简介" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="createTime" label="发表时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            v-has="'WBGLTJ'"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            v-has="'WBGLSC'"
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
            fetchData(`/xy-index-msg/XyIndexMsg/currentPage/${this.pageIndex}/pageSize/10`).then(res => {
                this.cateList = res.data.records
                this.pageTotal = res.data.total
            });
        },
        addGoods(){
            this.$router.push('/noticeAdd')
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/xy-index-msg/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getTypeList()
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$router.push({path:'/upDateNotice',query: {id:row.id}})
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
.htmlContent{
    white-space:nowrap;
    word-break: break-all;
    height: 25px;
    overflow: hidden;
}
</style>
