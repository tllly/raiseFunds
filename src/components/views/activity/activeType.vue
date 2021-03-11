<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 活动管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="activityName" label="活动类型"></el-table-column>
                <el-table-column prop="pic" label="活动图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.pic" style="width: 100px;height: 49px;" @click="onPreview(scope.row.pic)">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row)"
                            v-has="'HDLXBJ'"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 新人红包弹出框 -->
        <el-dialog title="新人红包活动" :visible.sync="activeNewVisible" width="50%">
            <activeNew v-if="activeNewVisible" :activeNewVisible="activeNewVisible" @update:activeNewVisible="val => activeNewVisible = val" :dataItem="curDataObj" @newSuccess="newSuccess"></activeNew>
        </el-dialog>
        <!-- 充值活动弹出框 -->
        <el-dialog title="充值活动" :visible.sync="activeRechargeVisible" width="50%">
            <activeRecharge v-if="activeRechargeVisible" :activeRechargeVisible="activeRechargeVisible" @update:activeRechargeVisible="val => activeRechargeVisible = val" :dataItem="curDataObj" @rechargeSuccess="rechargeSuccess"></activeRecharge>
        </el-dialog>
        <!-- 签到活动弹出框 -->
        <el-dialog title="签到活动" :visible.sync="activeSignVisible" width="50%">
            <activeSign v-if="activeSignVisible" :activeSignVisible="activeSignVisible" @update:activeSignVisible="val => activeSignVisible = val" @signSuccess="signSuccess" :dataItem="curDataObj"></activeSign>
        </el-dialog>
        <el-image-viewer 
         v-if="showViewer" 
         :on-close="closeViewer" 
         :url-list="[url]" />
    </div>
</template>

<script>
import { fetchData , deleteData } from '../../../api/index';
import activeNew from './activeNew'
import activeRecharge from './activeRecharge'
import activeSign from './activeSign'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
export default {
    name: 'activityType',
    components:{
        activeNew,
        activeRecharge,
        activeSign,
        ElImageViewer
    },
    data() {
        return {
            showViewer: false, // 显示查看器
            url:'',
            formInline: {
              user: '',
              region: ''
            },
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
            curDataObj:null,
            tableData: [],
            cateList:[],
            editVisible: false,
            activeNewVisible: false,
            activeRechargeVisible: false,
            activeSignVisible: false
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(`/activity-type/all`).then(res => {
                this.tableData = res.data
            });
        },
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
        // getTypeList(){
        //     fetchData(`/xy-goods-cate/XyGoodsCate/currentPage/1/pageSize/1000`).then(res => {
        //         this.cateList = res.data.records
        //     });
        // },
        addGoods(){
            this.$router.push('/addCate')
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/xy-goods-cate/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.getTypeList()
                    }
                })
            }).catch(() => {});
        },
        // 编辑操作
        handleEdit(row) {
            this.curDataObj = row
            if(row.id == 1){
                this.activeSignVisible = true
            }else if(row.id == 2){
                this.activeNewVisible = true
            }else if(row.id == 3){
                this.activeRechargeVisible = true
            }
        },
        //签到活动编辑成功
        signSuccess(){
            this.activeSignVisible = false
            this.getData()
        },
        //充值活动编辑成功
        rechargeSuccess(){
            this.activeRechargeVisible = false
            this.getData()
        },
        //新人活动编辑成功
        newSuccess(){
            this.activeNewVisible = false
            this.getData()
        },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getData();
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
