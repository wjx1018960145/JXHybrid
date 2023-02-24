<template>
    <div>
        <div class="page-header">
            <el-page-header @back="goBack">
            <template #content>
            <span class="text-large font-600 mr-3"> {{params.operationType}} </span>
            <div class="header-right">
                    <el-switch
                    v-model="isopen"
                    size="small"
                    inactive-text="是否启用?"
                        />    
                </div>
            </template>
            

        </el-page-header>
        </div>
        
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 后台服务配置
                </el-breadcrumb-item>
                <el-breadcrumb-item>网关编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">

                

                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="接口名称" prop="apiName">
                        <el-input v-model="form.apiName"></el-input>
                    </el-form-item>
                 
                    <el-form-item label="类型" prop="name">
                        <el-input v-model="form.type"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="所属系统" prop="apiServer">
                        <el-select v-model="form.apiServer" placeholder="请选择">
                            <el-option key="bbk" label="app-server" value="bbk"></el-option>
                            <el-option key="xtc" label="upload-server" value="xtc"></el-option>
                            <el-option key="imoo" label="authentication-server" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                   
                </el-form>
                <div style="margin-bottom: 20px">
                    <el-button type="primary" text @click="save()">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
    import {  getCurrentInstance,ComponentInternalInstance,} from 'vue'
    import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
export default {
    name: "baseform",
    props:{},
    setup(props,ctx) {
         const { proxy } = getCurrentInstance()
         const router = useRoute();
         const rootRouter = useRouter()
         const params = router.query
         console.log('###'+router.query.operationType);
         const isopen = ref(true)

        const options = [
          
        ];
        const rules = {
            name: [
                { required: true, message: "请输入表单名称", trigger: "blur" },
                {type:'number',message: "ID必须为数字"}
            ],
        };
        const formRef = ref();
        const form = reactive({
            operationType: params.operationType,
            apiName: params.apiName,
            type: params.type,
            apiServer: params.apiServer,
           
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                    console.log(form);
                    ElMessage.success("提交成功！");
                } else {
                    ElMessage.success("提交失败！");
                    return false;
                }
            });
        };
        // 重置
        const onReset = () => {
           proxy.$refs.formRef.resetFields()// formRef.value.resetFields();
        };

        const save =()=>{
            
        }

        const goBack =()=>{
            
            rootRouter.back()
        }

        return {
            options,
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
            goBack,
            save,
            params,
            isopen
        };
    },
};
</script>
<style >
.page-header{
    padding: 10;
    background: white;
    height: 60px;
    /* width: 70%; */
}
.el-page-header{
    padding: 15px ;
    width: 70%;
}
.page-header header-right {
    float: right;
    position: absolute;
    /* right:0px; */
    top: 50%;
    left: 50%;
    
}
</style>