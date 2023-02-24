<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 离线App
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">

                <el-form ref="searchRef" :model="query" :inline="true"  class="demo-form-inline">
                <el-form-item prop = "appId" >
                    <el-input v-model="query.appId" placeholder="APPID" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop = "appName">
                    <el-input  v-model="query.appName" placeholder="app名称" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
               <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
               <el-button type="primary" :icon="Delete" @click="restSearch">重置</el-button>
                </el-form-item>
                </el-form>


            </div>
            <div style="margin-bottom: 20px">
                <el-button type="primary" :icon="Plus" @click="addEditApp()">新建APP</el-button>
            </div>
            <el-table :data="tableData" border class="table" >
                <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
                <el-table-column prop="appId" label="APPID" width="180" align="center"></el-table-column>
                <el-table-column prop="appName" label="APP简称" width="180" align="center"></el-table-column>
                <el-table-column prop="appIdentifier" label="APP包名" width="200" align="center"></el-table-column>
                <el-table-column  prop="appPlatform"  key="appPlatform" label="APP平台" width="200" align="center">
                    <template #default="scope" >
                        <el-tag type="success">{{scope.row.appPlatform}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="当前离线包版本" prop="packageVersion" align="center" width="150">
                    <template #default="scope">
                        <el-tag :type="
                        scope.row.packageVersion !== null ?
                         'success': 'danger' ">
                            {{ scope.row.packageVersion === null?"未创建离线包":scope.row.packageVersion }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="生成时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="addEditApp(scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 编辑弹出框 -->
            <el-dialog title="添加/编辑" :close-on-click-modal="false" @close="close" v-model="editVisible"  width="30%"  label-width="120px">
                <el-form ref="formRef" :model="form" label-width="70px" >
                    <el-form-item label="APPID" prop="appId">
                        <el-input v-model="form.appId"    autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="APP全称" prop="appName">
                        <el-input v-model="form.appName"  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="APP简称" prop="appJianCheng">
                        <el-input v-model="form.appJianCheng"  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="APP包名" prop="appIdentifier">
                        <el-input v-model="form.appIdentifier" ></el-input>
                    </el-form-item>

                    <el-form-item label="APP描述" prop="appDes">
                        <el-input v-model="form.appDes" type="textarea" ></el-input>
                    </el-form-item>
                    <el-form-item label="APP平台" prop ="appPlatform">
                        <el-checkbox-group v-model="form.appPlatform" >
                            <el-checkbox label="iOS" name="3" />
                            <el-checkbox label="Android" name="6" />
                            <el-checkbox label="H5" name="9" />
                        </el-checkbox-group>
                    </el-form-item>

                </el-form>
                <template #footer>
                <span class="dialog-footer">
                     <el-button @click="onReset">重置</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
                </template>

            </el-dialog>
        </div>
    </div>

</template>

<script>
    import  {defineComponent,reactive, ref,nextTick }  from "vue";


    import { ElMessage, ElMessageBox,ElLoading} from "element-plus";

    import { Delete, Search, Plus } from '@element-plus/icons-vue'
    import {deleteOffline, insertOffline, listOffline} from "../api/index";
    export default defineComponent ({

        name: "offlineApp",
            setup(){
        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        const formRef = ref()
        const searchRef = ref()
        const form = reactive({
            appId: "",
            appName:"",
            appDes:"",
            appJianCheng:"",
            appIdentifier:"",
            appPlatform:[],
        });
        const query = reactive({
            appId: "",
            appName: "",
        });
        const  onReset =()=> {
            formRef.value.resetFields()
        }
        const close = () =>{
            formRef.value.resetFields()
        }
        const handleSearch =()=>{
            getData()
        }
        const restSearch = () =>{
            console.log(searchRef)
            searchRef.value.resetFields();// searchRef.value.resetFields();
        }
        const addEditApp =(row)=>{
            editVisible.value = true;
            if (row !=null){
                nextTick(()=>{
                     Object.keys(form).forEach((item) => {
                    form[item] = row[item];
                });
                })
            }

        };


        const tableData = ref([]);
        const pageTotal = ref(0);


        // 获取表格数据
        const getData = () => {
             const loading = ElLoading.service({
                lock: true,
                text: '加载中',
                background: 'rgba(0, 0, 0, 0.7)',
            })

            listOffline("").then((res) => {
                loading.close()
                tableData.value = res.data.data;
                console.log(tableData.value)
                // pageTotal.value = res.pageTotal || 50;
            }).catch((error)=>{
                ElMessage.error(error+"加载失败")
                loading.close()
            });
        };

        getData();


        // 删除操作
        const handleDelete = (index,row) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {

                    deleteOffline(row.id).then(()=>{
                        ElMessage.success("删除成功");
                        tableData.value.splice(index, 1);
                        getData();
                    }).catch(()=>{})


                    console.log(row.id)

                })
                .catch(() => {});
        };

        const saveEdit = () => {
            editVisible.value = false;

            console.log(form)
            insertOffline(form).then(()=>{
                ElMessage.success(`添加成功`);
                getData();

            }).catch(()=>{

            })


        };
        return {
            query,
            Search,
            Delete,
            Plus,
            tableData,
            pageTotal,
            editVisible,
            form,
            formRef,
            searchRef,
            restSearch,
            handleSearch,
            handleDelete,
            addEditApp,
            saveEdit,
            onReset,
            close
        }
    }

    })
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
