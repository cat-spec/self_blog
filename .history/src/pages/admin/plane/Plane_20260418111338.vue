<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import GlassCard from '../../../components/dashboard/GlassCard.vue'
</script>
<style scoped lang="less">
</style>