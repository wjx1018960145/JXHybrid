<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="sidebar.collapse"
            background-color="#011529" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon" />
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">

                            <el-menu-item v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title> {{}}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>


                            </el-menu-item>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>

                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>

import { computed } from "vue";

import { useSidebarStore } from '../store/sidebar'
import { useRoute, onBeforeRouteUpdate } from "vue-router";
export default {
    name: "sidebaSr",
    setup() {
        const items = [
            {
                icon: "HomeFilled",
                index: "/dashboard",
                title: "????????????",
            },
            {
                icon: "Management",
                index: "1",
                title: "??????????????????",
                subs: [
                    {
                        icon: "List",
                        index: "/mobileGateway",
                        title: "????????????",
                    }
                ]
            },
            {
                icon: "Management",
                index: "2",
                title: "????????????",
                subs: [

                    {
                        icon: "List",
                        index: "/issueList",
                        title: "????????????",
                    },
                    {
                        icon: "List",
                        index: "/jspatchList",
                        title: "???????????????",
                    },
                    {
                        icon: "List",
                        index: "/packageOffline",
                        title: "???????????????",
                    },
                    {
                        icon: "List",
                        index: "/smallappList",
                        title: "??????????????????",
                    },
                    {
                        icon: "List",
                        index: "/config",
                        title: "??????????????????",
                    },
                    {
                        icon: "List",
                        index: "/whitelist",
                        title: "???????????????",
                    },
                    {
                        icon: "List",
                        index: "/regulation",
                        title: "??????????????????",
                    },

                    {
                        icon: "List",
                        index: "/offlineApp",
                        title: "????????????",
                    },

                ]
            },
            {
                icon: 'Document',
                index: '/shellList',
                title: "????????????"
            },
            {
                icon: 'Document',
                index: '/terminal',
                title: "??????"
            },
            {
                icon: 'Document',
                index: "/form",
                title: "????????????"
            },

            {
                icon: 'Upload',
                index: "/upload",
                title: "????????????"
            }


        ];

        onBeforeRouteUpdate((to) => {
            console.log(to)
            // setTags(to);
        });

        const route = useRoute();
        const onRoutes = computed(() => {
            return route.path;
        });

        const sidebar = useSidebarStore();

        return {
            items,
            onRoutes,
            sidebar,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar>ul {
    height: 100%;
}
</style>
