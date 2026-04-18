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
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg bg-[var(--accent-bg)]/30 text-[var(--accent)]">
            <span>📊</span>
            <span>仪表盘</span>
          </a>
          <a href="#" class="opacity-50 flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>👥</span>
            <span>用户管理</span>
          </a>
          <a href="/admin/article" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>📝</span>
            <span>文章管理</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>⚙️</span>
            <span>系统设置</span>
          </a>
        
        </nav>
      </aside>
      
      <!-- 主内容区 -->
      <main class="flex-1 p-6">
        <div class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--text-h)]">仪表盘</h1>
          <p class="mt-1 text-sm opacity-70">欢迎回来，管理员</p>
        </div>
        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm opacity-70">总用户数</div>
                <div class="text-2xl font-semibold text-[var(--text-h)] mt-1">128</div>
              </div>
              <div class="w-12 h-12 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
                <span class="text-[var(--accent)] text-xl">👥</span>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm opacity-70">内容数量</div>
                <div class="text-2xl font-semibold text-[var(--text-h)] mt-1">56</div>
              </div>
              <div class="w-12 h-12 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
                <span class="text-[var(--accent)] text-xl">📝</span>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm opacity-70">今日访问</div>
                <div class="text-2xl font-semibold text-[var(--text-h)] mt-1">234</div>
              </div>
              <div class="w-12 h-12 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
                <span class="text-[var(--accent)] text-xl">👁️</span>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-sm opacity-70">开放平台</div>
                <div class="text-2xl font-semibold text-[var(--text-h)] mt-1">3</div>
              </div>
              <div class="w-12 h-12 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
                <span class="text-[var(--accent)] text-xl">🌐</span>
              </div>
            </div>
          </GlassCard>
        </div>
        
        <!-- 最近活动 -->
        <GlassCard class="mb-6">
          <h3 class="text-sm font-semibold text-[var(--text-h)] mb-4">最近活动</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[var(--accent-bg)] flex items-center justify-center text-[var(--accent)]">
                👤
              </div>
              <div>
                <div class="text-sm text-[var(--text-h)]">用户 admin 登录</div>
                <div class="text-xs opacity-70 mt-1">2026-04-17 16:30</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[var(--accent-bg)] flex items-center justify-center text-[var(--accent)]">
                📝
              </div>
              <div>
                <div class="text-sm text-[var(--text-h)]">新增内容</div>
                <div class="text-xs opacity-70 mt-1">2026-04-17 15:45</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-[var(--accent-bg)] flex items-center justify-center text-[var(--accent)]">
                🌐
              </div>
              <div>
                <div class="text-sm text-[var(--text-h)]">百度开放平台接入</div>
                <div class="text-xs opacity-70 mt-1">2026-04-17 14:20</div>
              </div>
            </div>
          </div>
        </GlassCard>
        
        <!-- 系统信息 -->
        <GlassCard>
          <h3 class="text-sm font-semibold text-[var(--text-h)] mb-4">系统信息</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex justify-between items-center">
              <span class="text-sm opacity-70">系统版本</span>
              <span class="text-sm text-[var(--text-h)]">1.0.0</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm opacity-70">前端框架</span>
              <span class="text-sm text-[var(--text-h)]">Vue 3</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm opacity-70">UI 组件</span>
              <span class="text-sm text-[var(--text-h)]">Element Plus</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm opacity-70">构建工具</span>
              <span class="text-sm text-[var(--text-h)]">Vite</span>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import GlassCard from '../../components/dashboard/GlassCard.vue';

const router = useRouter();

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