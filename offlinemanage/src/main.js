import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'

import elementIcon from "/src/plugins/svgicon";//实现element-puls icon的办法
import './assets/css/icon.css'

axios.defaults.baseURL = '/api'//最主要的一句
const app = createApp(App)
installElementPlus(app)

app.use(router).use(elementIcon).use(createPinia()).mount('#app')

