import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/main'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

import { message } from 'ant-design-vue';

const app = createApp(App)
const pinia = createPinia()

// 配置全局属性，调用方法：this.$message.success('成功提示');
app.config.globalProperties.$message = message;

app.use(router) // 使用路由
app.use(Antd) // 使用Antd
app.use(pinia) // 使用pinia

app.mount('#app')
