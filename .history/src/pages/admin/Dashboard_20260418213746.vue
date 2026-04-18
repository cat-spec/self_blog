<template>
  <div class="min-h-screen bg-[var(--bg)]">
    <!-- 后台导航栏 -->
    <header class="h-[56px] flex items-center justify-between px-6 border-b border-[var(--border)]/70 backdrop-blur bg-black/20">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-[var(--accent-bg)] border border-[var(--accent-border)]/70 flex items-center justify-center">
          <span class="text-[var(--accent)] font-mono font-semibold">AD</span>
        </div>
        <div class="leading-tight">
          <div class="text-[var(--text-h)] font-semibold">后台管理</div>
          <div class="text-xs opacity-70">控制面板</div>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <span class="text-sm text-[var(--text-h)]">管理员</span>
        <button class="h-9 px-4 rounded-lg bg-black/20 border border-[var(--border)]/70 hover:border-[var(--accent)]/60 text-sm" @click="handleLogout">
          退出登录
        </button>
      </div>
    </header>
    
    <!-- 后台主体内容 -->
    <div class="flex">
      <!-- 侧边栏 -->
      <aside class="w-[240px] shrink-0 border-r border-[var(--border)]/70 bg-black/15 backdrop-blur min-h-[calc(100svh-56px)]">
        <nav class="p-4 space-y-2">
          <div class="text-xs font-medium opacity-60 mb-4">菜单</div>
          <a href="/admin/dashboard" class="flex items-center gap-3 px-4 py-2 rounded-lg bg-[var(--accent-bg)]/30 text-[var(--accent)]">
            <span>📊</span>
            <span>仪表盘</span>
          </a>
         <div v-if="username=='admin'">
           <a href="#" class="opacity-50 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>👥</span>
            <span>用户管理</span>
          </a>
          <a href="/admin/dashboard/article" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>📝</span>
            <span>文章管理</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>⚙️</span>
            <span>系统设置</span>
          </a>
         </div>
        
        </nav>
      </aside>
      
      <!-- 主内容区 -->
      <main class="flex-1 p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import GlassCard from '../../components/dashboard/GlassCard.vue';

const router = useRouter();
const route = useRoute();
const username = route.query.username;

// 检查登录状态
const checkLoginStatus = () => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  if (!isLoggedIn) {
    router.push('/admin');
  }
};

// 处理退出登录
const handleLogout = () => {
  localStorage.removeItem('adminLoggedIn');
  router.push('/admin');
};

// 页面加载时检查登录状态
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>