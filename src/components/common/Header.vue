<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <audio ref="audio" src="../../assets/mp3/634.wav"></audio>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div> -->
                <!-- 消息中心 -->
                <div class="btn-bell" v-has="'XXGLLB'">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/messageList">
                            <span style="font-size: 14px;color: #ffffff;margin-right: 3px;">消息</span>
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message">{{message}}</span>
                </div>
                <div class="btn-bell" v-has="'CZGL'">
                    <el-tooltip
                        effect="dark"
                        :content="rechargeNum?`有${rechargeNum}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/userRecharge">
                            <span style="font-size: 14px;color: #ffffff;margin-right: 3px;">充值</span>
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="rechargeNum">{{rechargeNum}}</span>
                </div>
                <div class="btn-bell" v-has="'TXGLLB'">
                    <el-tooltip
                        effect="dark"
                        :content="depositNum?`有${depositNum}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/depositList">
                            <span style="font-size: 14px;color: #ffffff;margin-right: 3px;">提现</span>
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="depositNum">{{depositNum}}</span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item command="editPaw">修改密码</el-dropdown-item>
                        <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 修改密码 -->
        <el-dialog title="修改密码" :visible.sync="pawVisible" width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="原密码" prop="oldPwd">
                <el-input type="password" v-model="form.oldPwd"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPwdOne">
                <el-input type="password" v-model="form.newPwdOne"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="newPwdTwo">
                <el-input type="password" v-model="form.newPwdTwo"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import bus from '../common/bus';
import { fetchData , postData , updateData , imgUpload} from '../../api/index';
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 0,
            depositNum:0,
            rechargeNum:0,
            pawVisible:false,
            timeer:null,
            form: {
              oldPwd:'',
              newPwdOne:'',
              newPwdTwo:'',
              userId:'',
              type:1
            },
            rules: {
                oldPwd:[
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                ],
              newPwdOne:[
                { required: true, message: '请输入新密码', trigger: 'blur' },
              ],
              newPwdTwo:[
                { required: true, message: '请输入确认密码', trigger: 'blur' },
              ],
            }
        };
    },
    computed: {
        username() {
            let username = JSON.parse(localStorage.getItem('userObj'));
            return username ? username.val.account : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('userObj');
                this.$store.state.authList = null
                this.$router.push('/login');
            }
            if (command == 'editPaw') {
                this.pawVisible = true
            }
        },
        getHeadData(){
            fetchData(`/home/getHeadCount`).then(res => {
              this.message = res.data[0]
              this.rechargeNum = res.data[1]
              this.depositNum = res.data[2]
              if(this.rechargeNum || this.depositNum){
                this.startPlay()
              }
            });
        },
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if(this.form.newPwdOne != this.form.newPwdTwo){
                  this.$message.error('密码不一致');
                  return
                }
                updateData(`/sysUser/upPassword`,this.form).then(res => {
                  if(res.code == 200){
                    this.$message.success('操作成功')
                    localStorage.removeItem('userObj');
                    this.$store.state.authList = null
                    this.$router.push('/login');
                  }else{
                    this.$message.error(res.viewMsg);
                  }
                });
              }
            });
        },
        cancel(){
            this.pawVisible = false
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        startPlay() {
            this.$refs.audio.play()
        }
    },
    created(){
        let loginUserObj = JSON.parse(localStorage.getItem('userObj')).val//当前登录用户对象
        this.form.userId = loginUserObj.id
        this.getHeadData()
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
        this.timeer = setInterval(()=>{
            this.getHeadData()
        },1000*60)
    },
    beforeDestroy: function() {
        clearInterval(this.timeer)
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell{
    margin-right: 30px;
}
.btn-bell-badge {
    position: absolute;
    bottom: 20px;
    left: 45px;
    padding: 0 3px;
    min-width: 14px;
    min-height: 20px;
    text-align: center;
    line-height: 20px;
    display: block;
    font-size: 12px;
    border-radius: 20px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
