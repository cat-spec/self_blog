import { createRouter, createWebHistory } from 'vue-router'

const Dashboard = () => import('../pages/Dashboard.vue')
const Garden = () => import('../pages/Garden.vue')
const Admin = () => import('../pages/Admin.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/outplatform', name: 'outplatform', component: () => import('../pages/OutPlatform.vue') },
    { path: '/outplatform/alipay', name: 'alipayPlatform', component: () => import('../pages/outplatform/AlipayPlatform.vue') },
    { path: '/outplatform/baidu', name: 'baiduPlatform', component: () => import('../pages/outplatform/GoogleCloudPlatform.vue') },
    { path: '/outplatform/wechat', name: 'wechatPlatform', component: () => import('../pages/outplatform/WechatPlatform.vue') },
    { path: '/garden', name: 'garden', component: Garden },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/selfskill', name: 'selfskill', component: () => import('../pages/Selfskill.vue') },
    { path: '/garden/detail', name: 'garden-detail', component: () => import('../components/garden/Gardendetail.vue') },
  ],
})

