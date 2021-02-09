<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 会员列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20">
                <el-col :span="3">
                    <div class="treeBox">
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-col>
                <el-col :span="21">
                    <div class="handle-box">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                          <el-form-item label="用户名称">
                            <el-input placeholder="请输入用户名称"></el-input>
                          </el-form-item>
                          <el-form-item label="手机号码">
                            <el-input placeholder="请输入手机号码"></el-input>
                          </el-form-item>
                          <el-form-item label="注册时间">
                            <el-date-picker
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="状态">
                            <el-select placeholder="所有状态" v-model="aaa" class="handle-select mr10" clearble>
                                <el-option key="1" label="真人" value="真人"></el-option>
                                <el-option key="2" label="假人" value="假人"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="handleSearch">搜索</el-button>
                            <el-button>重置</el-button>
                            <el-button>导出</el-button>
                          </el-form-item>
                        </el-form>
                    </div>
                    <el-table
                        :data="tableData"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                        @selection-change="handleSelectionChange"
                    >
                        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                        <el-table-column prop="id" label="ID" width="55"></el-table-column>
                        <el-table-column prop="account" label="账号"></el-table-column>
                        <el-table-column prop="username" label="用户名"></el-table-column>
                        <el-table-column prop="num" label="人数"></el-table-column>
                        <el-table-column prop="num" label="活跃人数"></el-table-column>
                        <el-table-column prop="num" label="账户余额">
                            <template slot-scope="scope">{{scope.row.money}}</template>
                        </el-table-column>
                        <el-table-column prop="num" label="冻结金额"></el-table-column>
                        <el-table-column prop="num" label="利息宝"></el-table-column>
                        <el-table-column prop="name" label="上级用户"></el-table-column>
                        <el-table-column prop="name" label="邀请码"></el-table-column>
                        <el-table-column prop="" label="线上充值"></el-table-column>
                        <el-table-column prop="" label="线上提现"></el-table-column>
                        <el-table-column prop="date" label="注册时间"></el-table-column>
                        <el-table-column prop="IP" label="最后登录IP"></el-table-column>
                        <!-- <el-table-column label="头像(查看大图)" align="center">
                            <template slot-scope="scope">
                                <el-image
                                    class="table-td-thumb"
                                    :src="scope.row.thumb"
                                    :preview-src-list="[scope.row.thumb]"
                                ></el-image>
                            </template>
                        </el-table-column> -->
                        <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
                        <el-table-column label="状态" align="center" width="120">
                            <template slot-scope="scope">
                                <el-tag type="success">真人</el-tag>
                                <el-tag type="danger">代理</el-tag>
                            </template>
                        </el-table-column>

                        <!-- <el-table-column prop="date" label="注册时间"></el-table-column> -->
                        <el-table-column label="操作" width="180" align="center" fixed="right">
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
                            :current-page="query.pageIndex"
                            :page-size="query.pageSize"
                            :total="pageTotal"
                            @current-change="handlePageChange"
                        ></el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData , postData } from '../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            formInline: {
              user: '',
              region: ''
            },
            aaa:'',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [{
                id:"fdjsk",
                account:'1256525452',
                name:"fdjsk",
                num:23215,
                money:"fdjsk",
                thumb:"fdjsk",
                address:"fdjsk",
                state:"fdjsk",
                time:"2021-10-12 20:21:00",
                IP:"192.168.1.125"
            }],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            data: [{
              label: '一级 1',
              children: [{
                label: '二级 1-1',
                children: [{
                  label: '三级 1-1-1'
                }]
              }]
            }, {
              label: '一级 2',
              children: [{
                label: '二级 2-1',
                children: [{
                  label: '三级 2-1-1'
                }]
              }, {
                label: '二级 2-2',
                children: [{
                  label: '三级 2-2-1'
                }]
              }]
            }, {
              label: '一级 3',
              children: [{
                label: '二级 3-1',
                children: [{
                  label: '三级 3-1-1'
                }]
              }, {
                label: '二级 3-2',
                children: [{
                  label: '三级 3-2-1'
                }]
              }]
            }],
            defaultProps: {
              children: 'children',
              label: 'label'
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData('/xy-users/XyUsers/currentPage/1/pageSize/10').then(res => {
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // delAllSelection() {
        //     const length = this.multipleSelection.length;
        //     let str = '';
        //     this.delList = this.delList.concat(this.multipleSelection);
        //     for (let i = 0; i < length; i++) {
        //         str += this.multipleSelection[i].name + ' ';
        //     }
        //     this.$message.error(`删除了${str}`);
        //     this.multipleSelection = [];
        // },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //点击树
        handleNodeClick(data) {
            console.log(data);
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

.treeBox{
    border: 1px solid #DCDFE6;
    border-radius: 3px;
    padding: 15px 0;
}
</style>
