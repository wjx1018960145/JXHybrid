<template>
    <div class="header" :class="{ 'header-collapse': sidebar.collapse }">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <el-icon v-if="!sidebar.collapse"><Fold></Fold></el-icon>
            <el-icon v-else ><Expand /></el-icon>
        </div>
        <div class="logo">离线包配置管理</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <!-- <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                                <el-dropdown-item>项目仓库</el-dropdown-item>
                            </a> -->
                            <el-dropdown-item command="user">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import {  onMounted } from "vue";
import { useSidebarStore } from '../store/sidebar'
import { useRouter } from "vue-router";
export default {
    setup() {
        const username = localStorage.getItem("ms_username");
        const message = 2;

        const sidebar = useSidebarStore();
        // 侧边栏折叠
        const collapseChage = () => {
            sidebar.handleCollapse();
        };

        onMounted(() => {
            if (document.body.clientWidth < 1500) {
                collapseChage();
            }
        });

        // 用户名下拉菜单选择事件
        const router = useRouter();
        const handleCommand = (command) => {
            if (command == "loginout") {
                localStorage.removeItem("ms_username");
                router.push("/login");
            } else if (command == "user") {
                router.push({name:"user"});
            }
        };

        return {
            sidebar,
            username,
            message,
            collapseChage,
            handleCommand,
        };
    },
};
</script>
<style scoped>
.header {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    left: 250px;

    padding-right: 0px;
    font-size: 22px;
    color: #ffffff;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
}
.header-collapse {
    left: 65px;
    /*padding-right: -470px;*/
    /*background: #f56c6c;*/
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
    position: fixed;
    right:0px;
    padding-right: 20px;
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
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
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
