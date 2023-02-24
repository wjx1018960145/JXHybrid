import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "../views/home.vue";
const publicRoutes = [
    {
        path: '/',
        redirect: '/dashboard'
    },

    
    {
        path: '/',
        name: "Home",
        component: Home,
        children:[
           

            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },

            {
                path: "/mobileGateway",
                name: "mobileGateway",
                meta: {
                    title: '网关编辑'
                },
                component: () => import ( "../views/serviceConfig/gateway/mobileGateway.vue")
            },
            
            {
                path:"/edit",
                name:'edit',
                meta:{
                    title:"网关编辑"
                },
                component: () => import('../views/serviceConfig/gateway/edit.vue'),
            },

            {
                path: "/issueList",
                name: "issueList",
                meta: {
                    title: '发布管理'
                },
                component: () => import ( "../views/realtime/issue/issueList.vue")
            },
            {
                path: "/jspatchList",
                name: "jspatchList",
                meta: {
                    title: '热修复管理'
                },
                component: () => import ("../views/jspatch/jspatch/jspatchList.vue")
            },
            {
                path: "/packageOffline",
                name: "packageOffline",
                meta: {
                    title: '离线包管理'
                },
                component: () => import ( "../views/offline/OfflinelineList.vue")
            },
            {
                path: "/smallappList",
                name: "smallappList",
                meta: {
                    title: '小程序包管理'
                },
                
                component: () => import (  "../views/smallapp/smallapp/smallappList.vue")
            },
            {
                path: "/config",
                name: "config",
                meta: {
                    title: '配置开关管理'
                },
                component: () => import ( "../views/config/config/config.vue")
            },
            {
                path: "/whitelist",
                name: "whitelist",
                meta: {
                    title: '白名单管理'
                },
                component: () => import ("../views/whitelist/whitelist/whitelist.vue")
            },
            {
                path: "/regulation",
                name: "regulation",
                meta: {
                    title: '发布规则管理'
                },
                component: () => import ( "../views/regulation/regulation/regulation.vue")
            },
            {
                path: '/offlineApp',
                name: 'offlineApp',
                meta: {
                    title: '全局配置'
                },
                component: () => import ('../views/offlineApp.vue')
            },
            {
                path: '/shellList',
                name: 'shellList',
                meta: {
                    title: '脚本管理'
                },
                component: () => import ('../views/shellList.vue')
            },
            {
                path:'/terminal',
                name:'terminal',
                component: () => import ("../views/terminal")
            },
            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import (  "../views/BaseForm.vue")
            },

            {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ("../views/Upload.vue")
            },
             
        ]
    },

    
    {
        path: '/login',
        name: 'login',
        component: () => import ( '../views/login')
    },
   
    {
        path:'/user',
        name:'user',
        redirect: '/user'
        // component: () => import ("../views/user.vue")
    },
    
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRoutes
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router
