import { createRouter, createWebHistory } from 'vue-router'

const Dashboard = () => import('../pages/Dashboard.vue')
const Garden = () => import('../pages/Garden.vue')
const Admin = () => import('../pages/Admin.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/garden', name: 'garden', component: Garden },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/garden/detail', name: 'garden-detail', component: () => import('../components/garden/Gardendetail.vue') },
  ],
})

