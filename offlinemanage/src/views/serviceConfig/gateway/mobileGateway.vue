<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleSelect">
            <el-tab-pane v-for="(v, i) in navTxt" :key="v.txtId" :label="v.name">
                <!-- {{ i }} -->
                <div v-if="i == 0">
                    <div style="margin-bottom: 20px"><el-button type="primary" text
                            @click="addEditApp()">新建API</el-button></div>
                    <!-- <el-button style="float: right; margin-right: 25px" type="primary" :icon="Plus" @click="addEditApp('offline')">添加离线包</el-button> -->
                    <el-table :data="tableData" style="width: 100%">
                        <!-- <el-table-column  prop="id" label="ID"  width="180"  align="center"></el-table-column> -->
                        <el-table-column prop="operationType" label="operationType" sortable width="380">
                        </el-table-column>
                        <el-table-column prop="apiName" label="接口名称" sortable width="380">
                        </el-table-column>
                        <el-table-column prop="apiServer" label="所属系统" sortable width="180">
                        </el-table-column>
                        <el-table-column prop="type" label="类型">
                        </el-table-column>
                        <el-table-column prop="status" label="状态">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="220">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click.prevent="lookRow(scope.$index)">
                                    查看
                                </el-button>
                                <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                                    删除
                                </el-button>
                                <el-button link type="primary" size="small" @click.prevent="updateRow(scope.$index)">
                                    修改
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <div v-else-if="1">


                </div>
                <div v-else-if="2">

                </div>

            </el-tab-pane>

        </el-tabs>
        <el-dialog v-model="dialogFormVisible" title="移动网关">
            <el-form ref="formRef" :rules="rules" :model="form" label-width="180px">
                <el-form-item label="OperationType" prop="operationType" :label-width="formLabelWidth">
                    <el-input v-model="form.operationType" autocomplete="off" placeholder="com.mpaas.test" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="commitApi">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script >
import { ref, reactive } from 'vue'

import { ElMessage, ElMessageBox, ElLoading, FormItemProp } from "element-plus";
import { Search, Plus, Upload, Edit, Delete, FolderAdd, Download } from '@element-plus/icons-vue'
import { fetchGetaway, insertGetaWay, deleteGetaWay, updateGetaWay } from "../../../api";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
export default {
    name: 'modileGateway',

    setup() {
        const tableData = ref([])
        const dialogFormVisible = ref(false);
        const formRef = ref('')
        const router = useRouter();
        const rules = {
            operationType: [
                { required: true, message: "请输入operationType", trigger: "blur" },
                { pattern: /^[a-zA-Z\.]+$/, message: '内容只能为字母', trigger: 'blur' },
            ],
        }

        const formLabelWidth = '140px'

        const navTxt = ref([
            {
                name: 'API管理',
                txtId: 1,
                num: 0
            },
            {
                name: 'API分组',
                txtId: 2,
                num: 0
            },
            {
                name: '网关管理',
                txtId: 3,
                num: 0
            }

        ])
        const form = reactive({
            operationType: "",
        })


        const addEditApp = () => {
            dialogFormVisible.value = true;
        }
        const getData = (params) => {

            const loading = ElLoading.service({
                lock: true,
                text: '加载中',
                background: 'rgba(0, 0, 0, 0.7)',
            })

            fetchGetaway("").then((res) => {
                tableData.value = res.data.data;
                console.log(tableData)
                // getSpanArr(tableData.value)
                loading.close()
                // flitterdata4(tableData.value, ['appId'])
                // tableData.value = formatData(res.data.data)
                // const list = Tools.margePropData(tableData.value, 'appId')
                // // pageTotal.value = res.pageTotal || 50;
                // tableData.value = Tools.mergeRows(list,'appId')
            }).catch((error) => {
                ElMessage.error(error + "加载失败")
                loading.close()
            });
        }
        const commitApi = () => {

            formRef.value.validate((valid) => {
                if (valid) {
                    dialogFormVisible.value = false
                    insertGetaWay(form).then((res) => {
                        ElMessage.success(`添加成功`);
                        getData("")
                    }).catch(() => {
                        ElMessage.error("添加失败")
                    })

                } else {
                    console.log('error submit!', valid)
                    return false
                }
            });
        }

        getData("")
        const handleSelect = (tab, event) => {
            console.log(tab.index, event);
            if (tab.index == 0) {
                getData("")
            } else if (tab.index == 1) {

            } else if (tab.index == 2) {

            }
        }
        const deleteRow = (index) => {
            console.log(index)
            tableData.value.splice(index, 1)
        }
        const updateRow = (index) =>{
            
            let mode = tableData.value[index]
            console.log(mode)
            router.push({ path: "/edit", query:mode});
        }
        return {
            // 变量
            navTxt, dialogFormVisible, form, rules, formRef, tableData,
            //按钮
            Search, Plus, Upload, Edit, Delete, FolderAdd, Download,
            // 方法
            getData,//获取数据
            commitApi,//添加
            addEditApp,//弹出框
            deleteRow,//删除
            updateRow,//修改
            handleSelect,//切换tab
        };
    }
}
</script>
<style>

</style>