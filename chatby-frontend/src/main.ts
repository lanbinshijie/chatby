import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/main'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
