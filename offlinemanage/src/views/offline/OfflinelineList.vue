<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 离线包
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form ref="searchRef" :model="query" :inline="true" class="demo-form-inline">
                    <el-form-item prop="appId">
                        <el-input v-model="query.appId" placeholder="APPID" class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item prop="appStatus">
                        <el-select v-model="query.appStatus" placeholder="状态" class="handle-select mr10">
                            <el-option key="1" label="已发布" value="1"></el-option>
                            <el-option key="2" label="未发布" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleSearch(query.appId)">搜索</el-button>
                        <el-button type="primary" :icon="Delete" @click="restSearch">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div style="margin-bottom: 20px">
                <el-button type="primary" text @click="addEditApp('h5app')">新建H5App</el-button>
                <el-button style="float: right; margin-right: 25px" type="primary" :icon="Plus" @click="addEditApp('offline')">添加离线包</el-button>
            </div>

            <el-container>
                <el-aside width="200px">
                    <el-input v-model="inputValue" style="margin-top: 20px;" placeholder="id、包名" />
                    <el-table :data="appData.filter(data => !inputValue|| (data.packageId.includes(inputValue)) || data.packageName.toLowerCase().includes(inputValue.toLowerCase()))" :show-header="false" border style="margin-top: 10px;" @cell-click="cellClick">
                        <el-table-column align="center" prop="packageName" label="" width="200" />

                    </el-table>
                </el-aside>
                <el-main>
                    <el-table :data="tableData" border class="table"  row-key="id" >
                <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
<!--                <el-table-column prop="appId" label="应用ID" width="180" align="center"></el-table-column>-->
                        <el-table-column prop="packageId" label="包Id" width="180" align="center"></el-table-column>
                <el-table-column prop="appPackageVersion" label="版本号" width="180" align="center"></el-table-column>
                <el-table-column prop="appPackageStatus" label="状态" align="center">
                    <!--                    <template #default="scope">-->
                    <!--                        <el-tag :type="-->
                    <!--                                scope.row.appPackageStatus === 1-->
                    <!--                                    ? 'success'-->
                    <!--                                    : scope.row.appPackageStatus === 0-->
                    <!--                                    ? 'danger'-->
                    <!--                                    : ''-->
                    <!--                            ">{{ scope.row.appPackageStatus === 1?"已发布":'未发布' }}</el-tag>-->
                    <!--                    </template>-->
                    <template v-slot="{ row }">
                        <el-switch @change="showHandle(row)" v-model="row.appPackageStatus" :active-value="1"
                            :inactive-value="0" />
                    </template>
                </el-table-column>

                <el-table-column prop="appPackageUrl" label="包地址" align="center"></el-table-column>

                <el-table-column prop="createTime" label="生成时间" align="center"></el-table-column>

                <el-table-column label="操作" width="240" align="center">
                    <template #default="scope">
                        <!-- <el-button type="primary" :icon="FolderAdd" circle @click="addIncrement(scope.row)"> </el-button> -->
<!--                        <el-button type="primary" :icon="Edit" @click="addEditApp(scope.row)" circle></el-button>-->
                        <el-button type="primary" text @click="handleDelete(scope.$index, scope.row)" circle>创建发布</el-button>
                        <el-button type="primary" text @click="handleDelete(scope.$index, scope.row)" circle>删除</el-button>
                        <el-button type="primary" text >下载</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
                </el-main>
            </el-container>




        </div>

        <el-drawer
                v-model="openAddOffline"
                title="新增离线包"
                direction="rtl"
                :close="handleCloseDrawer"
                size="45%"
                :close-on-click-modal="false"
                :destroy-on-close="true"
        >

            <el-form label-width="70px" ref="refForm" label-position="top" :rules="rules" :model="form">

                <el-form-item label="应用id" prop="appId">
                    <el-select v-model="form.appId" placeholder="请选择应用id" @click="selectOfflineApp" >
                        <el-option :label="item.appId" :value="item.appId" v-for="item in offlineList" :key="item.id">
                        </el-option>
                        <!--          <el-option label="区域二" value="beijing"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label = "离线包" prop="packageId">
                    <el-select v-model="form.packageId" @change="changeValue($event)" placeholder="请选择应用id" @click="selectPackageId" >
                        <el-option :label="item.packageName" :value="item.packageId" v-for="item in packageList" :key="item.id">
                        </el-option>
                        <!--          <el-option label="区域二" value="beijing"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号" prop="appPackageVersion"  :label-width="formLabelWidth" >
                    <el-input v-model="form.appPackageVersion"  :disabled="true" style="width: 200px"></el-input>
                </el-form-item>
                <div v-if="form.appPackageVersion != ''">
                    <el-form-item label="添加文件" v-if="uploadList.length == 0" >

                        <el-upload class="upload-demo" ref="upload" drag action="uploadFile" :on-change="onchange"
                                   show-file-list="true" v-model="form.appPackageUrl" :auto-upload="false" style="width: 400px;">
                            <el-icon class="el-icon--upload">
                                <upload-filled />
                            </el-icon>
                            <div class="el-upload__text">
                                将文件拖到此处，或 <em>点击上传</em>
                            </div>
                            <template #tip>

                                <div class="el-upload__tip">
                                    只能上传zip文件，且不超过10M
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                    <el-form-item :label="uploadStatus === '1' ? '待上传' : uploadStatus === '2' ? '已上传' : ''"
                                  :label-width="formLabelWidth" v-else-if="uploadList.length > 0">
                        <el-tag v-for="tag in uploadList" :key="tag.name" class="mx-1" closable
                                :type="uploadStatus === '1' ? 'warning' : uploadStatus === '2' ? 'success' : 'danger'"
                                @close="handleClose(tag)" style="width: 200px">
                            {{ tag.name }}
                        </el-tag>
                        <el-button style="margin-left: 10px;" size="small" :disabled="disabled" type="primary"
                                   @click="submitUpload">上传到服务器<el-icon class="el-icon--right">
                            <Upload />
                        </el-icon>
                        </el-button>
                    </el-form-item>
                </div>




                <label
                >客户端生效范围</label
                >
                <br>

                <div>
                    <div style="margin-top: 20px;display: flex; ">
                        <el-form-item prop="allowIOS">
                            <div style="width: 100px; " >
                                <el-checkbox v-model="form.allowIOS" @change="allowIOSChang" true-label="1" false-label="0" label="ios" size="large" />
                            </div>
                        </el-form-item>

                        <div style="width: 400px">
                            <el-form-item prop="iosMinVersion">
                            <el-input v-model="form.iosMinVersion"
                                      placeholder="请输入客户端最低版本"
                                      class="input-with-select"
                                      :disabled='iosMinVersionDisabled'
                            >
                                <template #prepend>
                                    <el-select  placeholder="最低版本" style="width: 115px"   >
                                        <el-option label="最低版本" value="1" />

                                    </el-select>
                                </template>
                            </el-input>
                            </el-form-item>
                        </div>
                                <h4> &nbsp;-&nbsp; </h4>
                        <div style="width: 400px">
                            <el-form-item prop="iosMaxVersion">
                                <el-input v-model="form.iosMaxVersion"
                                          placeholder="请输入客户端最高版本"
                                          class="input-with-select"
                                          :disabled='iosMaxVersionDisabled'
                                >
                                    <template #prepend>
                                        <el-select  placeholder="默认版本" style="width: 115px">
                                            <el-option label="最高版本" value="1" />
                                            <el-option label="默认版本" value="2" />

                                        </el-select>
                                    </template>
                                </el-input>
                            </el-form-item>

                        </div>
                    </div>

                    <div style="margin-top: 10px; display: flex">
                        <el-form-item prop="allowAndroid">
                            <div style="width: 100px;">
                                <el-checkbox v-model="form.allowAndroid" @change="allowAndroidChang" true-label="1" false-label="0"  label="android" size="large" />
                            </div>
                        </el-form-item>

                        <div style="width: 400px">
                            <el-form-item prop="androidMinVersion">
                            <el-input v-model="form.androidMinVersion"
                                      placeholder="请输入客户端最低版本"
                                      class="input-with-select"
                                      :disabled='androidMinVersionDisabled'
                            >
                                <template #prepend>
                                    <el-select  placeholder="最低版本" style="width: 115px">
                                        <el-option label="最低版本" value="1" />

                                    </el-select>
                                </template>
                            </el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <h4> &nbsp;-&nbsp; </h4>
                        </div>
                        <div style="width: 400px">
                            <el-form-item prop="androidMaxVersion">
                                <el-input v-model="form.androidMaxVersion"
                                          placeholder="请输入客户端最高版本"
                                          class="input-with-select"
                                          :disabled='androidMaxVersionDisabled'
                                >
                                    <template #prepend>
                                        <el-select  placeholder="默认版本" style="width: 115px">
                                            <el-option label="最高版本" value="1" />
                                            <el-option label="默认版本" value="2" />

                                        </el-select>
                                    </template>
                                </el-input>
                            </el-form-item>

                        </div>
                    </div>
                </div>
                <br>
                <!--                配置信息-->

                    <el-form-item label="配置信息" prop="mainUrl"  >
                        <el-input v-model="form.mainUrl" style="width: 70%;" placeholder="URL主入口"></el-input>
                    </el-form-item>

            </el-form>
            <template #footer>

                <span class="dialog-footer">

                    <el-checkbox v-model="form.confirmSelect"   label="已确认以上信息准确" style="margin-right: 50px" />
<!--                    <el-button @click="onReset()">置空</el-button>-->
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-drawer>


        <!-- 编辑弹出框 -->



        <el-dialog title="新增H5App"  v-model="editVisible" :close-on-click-modal="false" width="30%" @close='close'>

            <el-form ref="refAppForm" label-position="top" :model="appForm" :rules="appRules"  label-width="100px"  >

                <el-form-item label="应用" prop="appId">
                    <el-select v-model="appForm.appId" placeholder="请选择应用" @click="selectOfflineApp">
                        <el-option :label="item.appName" :value="item.appId" v-for="item in offlineList" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="离线包ID" prop="packageId" :label-width="formLabelWidth">
                    <el-input maxlength="8"  v-model="appForm.packageId" style="width: 400px;"/>
                </el-form-item>
                <el-form-item label="离线包名称" prop="packageName" :label-width="formLabelWidth">
                    <el-input v-model="appForm.packageName" style="width: 400px;"/>
                </el-form-item>
            </el-form>
            <template #footer>

                <span class="dialog-footer">
<!--                    <el-checkbox v-model="form.confirmSelect"  label="已确认以上信息准确" style="margin-right: 50px" />-->
<!--                                        <el-button @click="onReset()">置空</el-button>-->
                    <el-button type="primary" @click="saveH5App">确 定</el-button>
                </span>
            </template>

        </el-dialog>

        <!-- 添加增量包 -->
        <el-dialog title="添加增量包" :close-on-click-modal="false" v-model="editIncrement" width="30%" @close="close">
            <el-form :model="incrementForm" ref="incrementRef">
                <el-form-item label="应用ID" prop="appId" :label-width="formLabelWidth">
                    <el-input v-model="incrementForm.appId" disabled="true" placeholder="" class="handle-input">
                    </el-input>
                </el-form-item>
                <el-form-item label="增量版本号" prop="appPackageVersion" :label-width="formLabelWidth">
                    <el-input v-model="incrementForm.appPackageVersion" disabled="true" placeholder=""
                        class="handle-input"></el-input>
                </el-form-item>



            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive, nextTick } from "vue";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import { Search, Plus, Upload, Edit, Delete, FolderAdd,Download } from '@element-plus/icons-vue'
//导入js文件(文件脚本内容在下文)
// import { getRowspanMethod } from '@/utils/span-method.js'
// import { Tools } from "@element-plus/icons-vue";
import { deletePackage, fetchData, insertPackage, listOffline, uploadPackage,listPackageByAppid,listH5App,insertH5App,deleteH5App ,getH5AppByAppId} from "../../api";

export default {
    name: "basetableS",


    setup() {
        const query = reactive({
            appId: "",
            appStatus: "",

        });
        const rules = {
            appId: [
                { required: true, message: "请选择应用ID", trigger: "blur" },
            ],
            packageId: [
                { required: true, message: "请选择离线包", trigger: "blur" }
            ],
            mainUrl:[
                {required: true, message: "请填写主URL", trigger: "blur"}
            ]
        }
        const appRules = {
            appId:[
                { required: true, message: "请选择应用ID", trigger: "blur" }
            ],
            packageId: [

                {required: true,  message: "请输入8位数字离线包ID", trigger: "blur" },
                {pattern: /[0-9]\d?/, message:'数字大小在(0,100)区间内', trigger: 'blur'},

            ],
            packageName: [
                { required: true, message: "请输入H5APP名称", trigger: "blur" }
            ],
        }
        const tableData = ref([]);
        const appData = ref([]);
        const pageTotal = ref(0);
        const searchRef = ref()
        const incrementRef = ref()
        const refForm = ref()
        const refAppForm = ref()
        const inputValue = ref()
        const disabled = ref(false)
        const editVisible = ref(false);
        const openAddOffline = ref(false);
        const editIncrement = ref(false)
        var offlineList = ref([]);
        var packageList = ref([]);
        const uploadList = ref([])
        const uploadStatus = ref()
        const upload = ref()
        let spanArr = ref(null)
        const iosMinVersionDisabled = ref(false)
        const iosMaxVersionDisabled = ref(false)
        const androidMinVersionDisabled = ref(false)
        const androidMaxVersionDisabled = ref(false)
        let pos
        const screenHeight = ref(`${document.documentElement.clientHeight}` - 200)

        const form = reactive({
            appId: "",
            packageId:'',
            appPackageVersion: "",
            appPackageUrl: '',
            mainUrl:'',
            allowIOS:'1',
            iosMinVersion:'0',
            iosMaxVersion:'10',
            iosMinSelect:'',
            iosMaxSelect:'',
            allowAndroid:'1',
            androidMinVersion:'0',
            androidMinSelect:'',
            androidMaxVersion:'10',
            androidMaxSelect:'',
            confirmSelect:''
        });
        const appForm = reactive({
            appId:'',
            packageId: '',
            packageName:''
        })
        const incrementForm = reactive({
            appId: '',
            appPackageVersion: '',
            appPackageUrl: ''
        })
        // const spanMethod = tableSpanHandle(2)
        // 获取表格数据
        const getData = (params) => {

            const loading = ElLoading.service({
                lock: true,
                text: '加载中',
                background: 'rgba(0, 0, 0, 0.7)',
            })

            fetchData(params).then((res) => {
                tableData.value = res.data.data;
                console.log(tableData.value)
                // getSpanArr(tableData.value)
                loading.close()
                // flitterdata4(tableData.value, ['appId'])
                // tableData.value = formatData(res.data.data)
                // const list = Tools.margePropData(tableData.value, 'appId')
                // // pageTotal.value = res.pageTotal || 50;
                // tableData.value = Tools.mergeRows(list,'appId')
            }).catch((error)=>{
                 ElMessage.error(error+"加载失败")
                loading.close()
            });

        };
        const getH5App =(appId)=>{

            listH5App(appId).then((res)=>{
                appData.value = res.data.data
                console.log(tableData.value)

            })


        }

        getData("");
        getH5App("");


        // 查询操作
        const handleSearch = (params) => {
            query.pageIndex = 1;

            getData(params);
        };
        const close = () => {
            refAppForm.value.resetFields()
            uploadList.value = []
            uploadStatus.value = 0
            openAddOffline.value = false
        }
        const handleCloseDrawer = ()=>{

            refForm.value.resetFields()
            openAddOffline.value = false
            console.log(form)

        }
        const restSearch = () => {
            console.log(searchRef)
            searchRef.value.resetFields();// searchRef.value.resetFields();
        }
        const addIncrement = (row) => {
            editIncrement.value = true
            incrementForm.appId = row['appId']
            incrementForm.appPackageVersion = 1.1

        }
        const addEditApp = (row) => {

            if (row == 'h5app'){
                // editVisible.value = true;

               editVisible.value = true;

            }else if(row == 'offline'){

                openAddOffline.value = true

            }else {
              
            }

        };
        const onReset = () => {
            uploadList.value = []
            uploadStatus.value = '0'
            // refForm.value.resetFields()

        }
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData("");
        };


        // 删除操作
        const handleDelete = (index, row) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    deletePackage(row.id).then(() => {
                        ElMessage.success("删除成功");
                        tableData.value.splice(index, 1);
                        getData("");
                    }).catch(() => {

                    })
                    console.log(row.id)
                })
                .catch(() => { });
        };

        // 表格编辑时弹窗和保存
        const saveEdit = () => {
            refForm.value.validate((valid) => {
                console.log(valid)
                if (valid) {

                    console.log(form)
                    insertPackage(form).then(() => {
                        openAddOffline.value = false;
                        refForm.value.resetFields()
                        ElMessage.success(`添加成功`);
                        getData("");
                    }).catch(() => {
                        ElMessage.error("添加失败")
                    })
                } else {
                    return false;
                }
            })
        };
        const saveH5App =  ()=>{

            refAppForm.value.validate((valid,fields)=>{
                if (valid){
                    editVisible.value = false
                    insertH5App(appForm).then(()=>{
                        ElMessage.success(`添加成功`);
                        getH5App("")
                    }).catch(()=>{
                        ElMessage.error("添加失败")
                    })
                }else {
                    console.log('error submit!', fields)
                    return false
                }
            })
        }
        const onchange = (value) => {
            uploadList.value.push(value.raw)
            uploadStatus.value = "1"
            console.log(value.raw)
        }
        const handleClose = () => {
            uploadList.value = []
        }

        const selectOfflineApp = () => {
            offlineList.value = []
            listOffline("").then((res) => {
                var data = res.data.data

                data.forEach(function (value) {
                    console.log(value)
                    offlineList.value.push({ appId: value.appId, id: value.id,appName:value.appName })
                })
            }).catch(() => { })
        }

        const cellClick = (row,column,event,cell)=>{
            console.log(row.packageId)
            getData(row.packageId)


        }
        const selectPackageId = ()=>{

            if(form.appId ==null || form.appId == ''){
                ElMessage.error("请先选择应用ID!")
                return
            }
            packageList.value = []
            getH5AppByAppId(form.appId).then((res)=>{
                var data = res.data.data
                data.forEach(function (value) {
                    packageList.value.push({packageId: value.packageId,packageName:value.packageName, id: value.id,version:value.version,mainUrl:value.mainUrl})
                })
            })
        }
        const  changeValue = (value)=>{
            for (let item of packageList.value){

                if (item.packageId === value) {
                    console.log(item);
                    form.appPackageVersion = item.version*1+1*1
                    console.log(item.version)
                    console.log(item.version*1+1*1)
                    form.mainUrl = item.mainUrl;
                    return item
                }
            }

        }
        const submitUpload = () => {
            // upload.value.submit();
            disabled.value = true
            let param = new FormData()
            const loading = ElLoading.service({
                lock: true,
                text: '上传中Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            param.append("fileName", uploadList.value[0])
            param.append("version",form.appPackageVersion);
            param.append("appId",form.appId);
            param.append("packageId",form.packageId);
            uploadPackage(param).then((res) => {
                console.log(res)
                form.appPackageUrl = res.data;
                loading.close()
                uploadStatus.value = "2"
                disabled.value = true
            }).catch((res) => {
                disabled.value = false
                ElMessage.error("上传失败!")
                loading.close()
                console.log(res)
            })

        }
        const handleRemove = (file, fileList) => {
            console.log(file, fileList);
        }
        const handlePreview = (file) => {
            console.log(file);
        }
        const handleAvatarSuccess = (res, file) => {
            console.log(file)
            form.appPackageUrl = file.response.data;
        }

        const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
            // 合并第二列，第一列是序号
            if (columnIndex === 1 ) {
                if (row.appId && row.appId !== " " && row.appId !== "—") {
                    const _row = spanArr.value[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col,
                    };
                }
            }
        }

        const getSpanArr=(data)=> {
            spanArr.value = [];
            data.map((item, i) => {
                if (i === 0) {
                    spanArr.value.push(1);
                    pos = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (item.appId === data[i - 1].appId) {
                        spanArr.value[pos] += 1;
                        spanArr.value.push(0);
                    } else {
                        spanArr.value.push(1);
                        pos = i;
                    }
                }
            });
            console.log(spanArr.value)
        }
        const allowIOSChang = (v) =>{
            if(v == 1){
                iosMinVersionDisabled.value = false
                iosMaxVersionDisabled.value = false
            }else{
                iosMinVersionDisabled.value = true
                iosMaxVersionDisabled.value = true
            }

        }
        const allowAndroidChang = (v)=>{
            if(v == 1){
                androidMinVersionDisabled.value = false
                androidMaxVersionDisabled.value = false
            }else{
                androidMinVersionDisabled.value = true
                androidMaxVersionDisabled.value = true
            }
        }



        // }

        return {
            query,
            searchRef,
            tableData,
            appData,
            pageTotal,
            editVisible,
            openAddOffline,
            editIncrement,
            form,
            appForm,
            incrementForm,
            Search,
            Plus,
            Upload,
            Edit,
            Delete,
            FolderAdd,
            Download,
            screenHeight,
            offlineList,
            packageList,
            uploadList,
            upload,
            uploadStatus,
            disabled,
            refForm,
            refAppForm,
            incrementRef,
            rules,
            iosMinVersionDisabled,
            iosMaxVersionDisabled,
            androidMinVersionDisabled,
            androidMaxVersionDisabled,
            appRules,
            spanArr,
            inputValue,
            getH5App,
            handleSearch,
            restSearch,
            onchange,
            handleRemove,
            handlePreview,
            handleAvatarSuccess,
            addEditApp,
            handlePageChange,
            handleDelete,
            saveEdit,
            saveH5App,
            selectOfflineApp,
            selectPackageId,
            changeValue,
            submitUpload,
            handleClose,
            handleCloseDrawer,
            close,
            onReset,
            addIncrement,
            getSpanArr,
            spanMethod,
            cellClick,
            allowIOSChang,
            allowAndroidChang

        };
    },
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
    width: 150px;
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
