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
                        <el-tree :data="TreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-col>
                <el-col :span="21">
                    <div class="handle-box">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                          <el-form-item label="用户名称">
                            <el-input placeholder="请输入用户名称" v-model="searchObj.nickname"></el-input>
                          </el-form-item>
                          <el-form-item label="手机号码">
                            <el-input placeholder="请输入手机号码" v-model="searchObj.tel"></el-input>
                          </el-form-item>
                          <el-form-item label="注册时间">
                            <el-date-picker
                              v-model="daterangeValue"
                              type="daterange"
                              value-format="yyyy-MM-dd"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="状态">
                            <el-select placeholder="所有状态" v-model="searchObj.status" class="handle-select mr10" clearble>
                                <el-option label="启用" value="1"></el-option>
                                <el-option label="禁用" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="handleSearch">搜索</el-button>
                            <el-button @click="resetSearch">重置</el-button>
                            <el-button>导出</el-button>
                          </el-form-item>
                        </el-form>
                    </div>
                    <el-table
                        :data="tableData"
                        id="listTable"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                    >
                        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                        <el-table-column prop="id" label="ID" width="55" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="username" label="账号" show-overflow-tooltip width="110"></el-table-column>
                        <el-table-column prop="nickname" label="用户名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="allCount" label="人数" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="allHyCount" label="活跃人数" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="balance" label="账户余额" show-overflow-tooltip>
                            <template slot-scope="scope">{{scope.row.balance}}</template>
                        </el-table-column>
                        <el-table-column prop="freezeBalance" label="冻结金额" show-overflow-tooltip></el-table-column>
                        <!-- <el-table-column prop="num" label="利息宝"></el-table-column> -->
                        <el-table-column prop="parent_name" label="上级用户" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="inviteCode" label="邀请码" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="" label="线上充值" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="" label="线上提现" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="addtime" label="注册时间" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="ip" label="最后登录IP" show-overflow-tooltip width="110"></el-table-column>
                        <el-table-column prop="isJia" label="状态" align="center" width="150">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.isJia == 1">真人</el-tag>
                                <el-tag v-else type="danger">假人</el-tag>
                                <el-tag style="margin-left: 5px;" type="" effect="dark" v-if="scope.row.isAgent == 1">代理</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="250" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="editInfo(scope.row)"
                                >编辑</el-button>
                                <el-button
                                    type="text"
                                    icon="el-icon-delete"
                                    class="red"
                                    @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button> 
                                <el-popover
                                  placement="top"
                                  width="845"
                                  :value="scope.row.visible">
                                  <div style="margin:0px;">
                                    <el-button size="mini" type="primary" @click="checkBill(scope.row)">账单</el-button>
                                    <!-- <el-button size="mini" type="success" @click="deductEdit(scope.row)">暗扣设置</el-button> -->
                                    <el-button size="mini" type="danger" @click="roleSwitch(scope.row)">{{scope.row.isJia == 0?'设为真人':'设为假人'}}</el-button>
                                    <el-button size="mini" type="warning" @click="agentSet(scope.row)" v-if="scope.row.isAgent == 0">代理设置</el-button>
                                    <el-button size="mini" type="warning" @click="agentCancel(scope.row)" v-else>取消代理</el-button>
                                    <el-button size="mini" type="primary" @click="accountDisable(scope.row)">{{scope.row.status == 1?'禁用':'启动'}}</el-button>
                                    <el-button size="mini" type="success" @click="bankCardInfo(scope.row)">银行卡信息</el-button>
                                    <el-button size="mini" type="danger" @click="addressSet(scope.row)">地址信息</el-button>
                                    <!-- <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                                    <el-button size="mini" type="warning" @click="refreshQr">刷新二维码</el-button>
                                    <el-button size="mini" type="primary" @click="checkTeam(scope.row)">查看团队</el-button>
                                    <el-button size="mini" type="success" @click="checkAccount(scope.row)">账变</el-button>
                                  </div>
                                  <el-button type="text" slot="reference" style="margin-left: 10px;">更多操作</el-button>
                                </el-popover>
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
                </el-col>
            </el-row>
        </div>
        <!-- 账单弹出框 -->
        <el-dialog title="账单" :visible.sync="billVisible" width="50%">
            <billPop v-if="billVisible" :dataItem="curDataObj"></billPop>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <editPop v-if="editVisible" :editVisible="editVisible" @update:editVisible="val => editVisible = val" :dataItem="curDataObj" @editSuccess="editSuccess"></editPop>
        </el-dialog>
        <!-- 暗扣设置弹出框 -->
        <el-dialog title="暗扣设置" :visible.sync="deductVisible" width="50%">
            <deductPop v-if="deductVisible" :deductVisible="deductVisible" @update:deductVisible="val => deductVisible = val" :dataItem="curDataObj" @deductSuccess="deductSuccess"></deductPop>
        </el-dialog>
        <!-- 代理设置弹出框 -->
        <el-dialog title="代理设置" :visible.sync="agentVisible" width="50%">
            <agentPop v-if="agentVisible" :agentVisible="agentVisible" @update:agentVisible="val => agentVisible = val" :dataItem="curDataObj" @agentSuccess="agentSuccess"></agentPop>
        </el-dialog>
        <!-- 地址信息弹出框 -->
        <el-dialog title="地址信息" :visible.sync="addressVisible" width="50%">
            <addressPop v-if="addressVisible" :addressVisible="addressVisible" @update:addressVisible="val => addressVisible = val" :dataItem="curDataObj" @addressSuccess="addressSuccess"></addressPop>
        </el-dialog>
        <!-- 银行卡信息弹出框 -->
        <el-dialog title="银行卡信息" :visible.sync="bankCardVisible" width="50%">
            <bankCardPop v-if="bankCardVisible" :bankCardVisible="bankCardVisible" @update:bankCardVisible="val => bankCardVisible = val" :dataItem="curDataObj" @bankCardSuccess="bankCardSuccess"></bankCardPop>
        </el-dialog>
        <!-- 团队查看弹出框 -->
        <el-dialog title="团队" :visible.sync="teamVisible" width="80%">
            <teamPop v-if="teamVisible" :teamVisible="teamVisible" @update:teamVisible="val => teamVisible = val" :dataItem="curDataObj"></teamPop>
        </el-dialog>
        <!-- 账目变化弹出框 -->
        <el-dialog title="交易记录" :visible.sync="accountVisible" width="80%">
            <accountListPop v-if="accountVisible" :accountVisible="accountVisible" @update:accountVisible="val => accountVisible = val" :dataItem="curDataObj"></accountListPop>
        </el-dialog>

    </div>
</template>

<script>
import { fetchData , postData , deleteData , updateData} from '../../../api/index';
import billPop from './components/billPop'
import editPop from './components/editPop'
import deductPop from './components/deductPop'
import agentPop from './components/agentPop'
import addressPop from './components/addressPop'
import bankCardPop from './components/bankCardPop'
import teamPop from './components/teamPop'
import accountListPop from './components/accountListPop'
export default {
    name: 'basetable',
    components:{
        billPop,
        editPop,
        deductPop,
        agentPop,
        addressPop,
        bankCardPop,
        teamPop,
        accountListPop
    },
    data() {
        return {
            formInline: {
              user: '',
              region: ''
            },
            daterangeValue:null,
            pageIndex: 1,
            pageSize: 10,
            query: {
                nickname:'',
                tel:'',
                startTime:'',
                endTime:'',
                status:''
            },
            searchObj:{
                nickname:'',
                tel:'',
                status:''
            },
            visiblefdsa:false,
            tableData: [],
            curDataObj:null,
            multipleSelection: [],
            delList: [],
            billVisible: false, //账单弹出框
            editVisible: false, //编辑弹出框
            deductVisible: false,//暗扣设置弹出框
            agentVisible: false, //代理设置
            addressVisible: false,//地址信息
            bankCardVisible: false,//银行卡信息
            teamVisible: false, //团队列表
            accountVisible: false,//账目变化
            pageTotal: 0,
            TreeData: [],
            defaultProps: {
              children: 'child',
              label: 'nickname'
            }
        };
    },
    created() {
        this.getData();
        this.getUserTree();
    },
    mounted() {
    },
    methods: {
        //模拟关闭popOver
        closePopover(item){
            document.getElementById("listTable").click()
        },
        //查看账单
        checkBill(item){
            this.curDataObj = item
            this.billVisible = true
        },
        //编辑信息
        editInfo(item){
            this.curDataObj = item
            this.editVisible = true
        },
        //编辑成功
        editSuccess(){
            this.editVisible = false
            this.$message.success('编辑成功')
            this.getData();
        },
        //设置暗扣成功
        deductSuccess(){
            this.deductVisible = false
            this.$message.success('操作成功')
            this.getData();
        },
        //暗扣设置
        deductEdit(item){
            this.curDataObj = item
            this.deductVisible = true
        },
        //设置代理成功
        agentSuccess(){
            this.agentVisible = false
            this.$message.success('操作成功')
            this.getData();
        },
        //真人假人转换
        roleSwitch(item){
            let data = {
                id:item.id,
                isJia:item.isJia == 1 ? 0 : 1
            }
            updateData(`/xy-users/update`,data).then(res => {
              this.closePopover()
              this.$message.success('操作成功')
              this.getData()
            });
        },
        //代理设置
        agentSet(item){
            this.curDataObj = item
            this.agentVisible = true
        },
        //代理取消
        agentCancel(item){
            let data = {
                id:item.id,
                isAgent:0
            }
            updateData(`/xy-users/update`,data).then(res => {
              this.closePopover()
              this.$message.success('操作成功')
              this.getData()
            });
        },
        //账户禁用启用
        accountDisable(item){
            let data = {
                id:item.id,
                status:item.status == 1 ? 2 : 1
            }
            updateData(`/xy-users/update`,data).then(res => {
              this.closePopover()
              this.$message.success('操作成功')
              this.getData()
            });
        },
        //银行卡信息
        bankCardInfo(item){
            this.curDataObj = item
            this.bankCardVisible = true
        },
        //银行卡信息设置成功
        bankCardSuccess(){
            this.bankCardVisible = false
            this.$message.success('操作成功')
            this.getData();
        },
        //地址信息
        addressSet(item){
            this.curDataObj = item
            this.addressVisible = true
        },
        //地址设置成功
        addressSuccess(){
            this.addressVisible = false
            this.$message.success('操作成功')
            this.getData();
        },
        //删除
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteData(`/xy-users/delete?guid=${row.id}`).then(res=>{
                    if(res.code == 200){
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    }
                })
            }).catch(() => {});
        },
        //刷新二维码
        refreshQr(){
            this.$message.success('刷新成功');
        },
        //查看团队
        checkTeam(item){
            this.curDataObj = item
            this.teamVisible = true
        },
        //查看账目
        checkAccount(item){
            this.curDataObj = item
            this.accountVisible = true
        },
        // 获取 easy-mock 的模拟数据
        getData(){
            fetchData(`/xy-users/XyUsers/currentPage/${this.pageIndex}/pageSize/10`,this.query).then(res => {
                this.tableData = res.data.records
                this.pageTotal = res.data.total
            });
        },
        //获取父类团队树
        getUserTree(){
            fetchData(`/xy-users/getParentGroup`).then(res => {
                this.TreeData = res.data
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.pageIndex = 1
            this.query.nickname = this.searchObj.nickname
            this.query.tel = this.searchObj.tel
            this.query.status = this.searchObj.status
            if(this.daterangeValue){
                this.query.startTime = this.daterangeValue[0]
                this.query.endTime = this.daterangeValue[1]
            }
            this.getData();
        },
        // 触发重置按钮
        resetSearch() {
            this.pageIndex = 1
            this.query.nickname = this.searchObj.nickname = ""
            this.query.tel = this.searchObj.tel = ""
            this.query.status = this.searchObj.status = ""
            this.daterangeValue = null
            this.query.startTime = ""
            this.query.endTime = ""
            this.getData();
        },
        // 多选操作
        // handleSelectionChange(val) {
        //     this.multipleSelection = val;
        // },
        // 分页导航
        handlePageChange(val) {
            this.pageIndex = val
            this.getData();
        },
        //点击树
        handleNodeClick(data) {
            this.tableData = []
            let _arr = []
            this.pageTotal=1
            if (data.child && data.child.length > 0) {
                _arr = data.child
                this.pageTotal += data.child.length
            }
            _arr.push(data)
            this.tableData = _arr
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
    max-height: 650px;
    overflow-y: scroll;
}
.treeBox::-webkit-scrollbar {
    width: 4px;
    cursor: pointer;
    border-radius: 4px;
}
.treeBox::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(19, 210, 219, .5);
    cursor: pointer;
}
.treeBox::-webkit-scrollbar-track {
    border-radius: 4px;
    background: rgba(255,255,255, 0.2);
    cursor: pointer;
}
</style>
