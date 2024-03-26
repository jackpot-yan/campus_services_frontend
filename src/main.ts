import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import router from './router'
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
// @ts-ignore
import './assets/incofont.js';

const app = createApp(App)
app.use(router)
app.mount('#app')
