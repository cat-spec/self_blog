import { createApp } from 'vue'
import './style.css'
import './tailwind.css'
import './dashboard.css'
import App from './App.vue'

import BaiduMap from 'vue3-baidu-map-gl'

const app = createApp(App)


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from './router'



app.use(router).use(ElementPlus).mount('#app')
