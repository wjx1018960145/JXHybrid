<template>
  <!-- <ContainerCustom>
   
  </ContainerCustom> -->
      <div class="personal-container margin-10 flex-box flex_w-wrap">
       
      </div>
</template>


<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

// import ContainerCustom from '@/components/container-custom'
// import BasicInfo from './components/basic-info'
// import EditPassword from './components/edit-password'
// import LoginLog from './components/login-log'
// import OperationLog from './components/operation-log'

// import { havePermission } from '@/utils'

export default defineComponent({
  
  setup() {
    // const store = useStore()

    // const administrator = computed(() => store.state.administrator.administrator)

    const data = reactive({
      active: 'basic'
    })

    return {
    //   administrator,
    //   ...toRefs(data),
    //   havePermission
    }
  }
})
</script>

<style lang="scss" scoped>
// .personal-container {
//   & > div:first-child {
//     height: fit-content;
//     min-width: 350px;
//   }
//   .panel {
//     border-radius: var(--el-border-radius-base);
//     background-color: var(--gl-content-panel-background-color);
//   }
// }
</style>
