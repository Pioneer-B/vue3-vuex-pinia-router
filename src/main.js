import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
import './assets/base.css'
// antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import * as icons from '@ant-design/icons-vue'

// vuex不能于pinia一起使用
const app = createApp(App)
app.use(createPinia()).use(router).use(Antd).mount('#app')
for (const i in icons) {
    app.component(i, icons[i])
}
// const token="b130c67ab250611314d145b6755ee55f"
// console.log(process.env)
