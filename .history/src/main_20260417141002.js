import { createApp } from 'vue'
import './style.css'
import './tailwind.css'
import './dashboard.css'
import App from './App.vue'

import BaiduMap from '@vue-baidu-map/vue3';
const app = createApp(App)


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from './router'

app.use(BaiduMap, {
  ak: 'IXkFtHDFk0dZ8GXqYWXfMr3kyV8Tltz5'
});

app.use(router).use(ElementPlus).mount('#app')
