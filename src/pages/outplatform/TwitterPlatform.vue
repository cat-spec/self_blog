<template>
  <AppLayout>
    <template #content>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Twitter%20logo%20icon%20simple%20flat%20design&image_size=square" alt="Twitter" class="w-5 h-5" />
          </div>
          <h1 class="text-2xl font-semibold text-[var(--text-h)]">Twitter 平台</h1>
        </div>
        
        <div class="mb-8">
          <p class="text-sm opacity-70">社交媒体平台，用于实时信息分享，帮助用户发布和发现内容。</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">核心功能</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>推文发布</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>社交互动（点赞、转发、回复）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>话题趋势</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>私信功能</span>
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">API 功能</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>推文管理</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>用户信息</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>趋势分析</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>搜索功能</span>
              </li>
            </ul>
          </GlassCard>
        </div>
        
        <div class="mt-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">应用场景</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">内容发布</h4>
                <p class="text-xs opacity-70">自动发布推文</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">数据分析</h4>
                <p class="text-xs opacity-70">跟踪推文表现</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">社交互动</h4>
                <p class="text-xs opacity-70">自动回复和互动</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../../components/dashboard/AppLayout.vue'
import GlassCard from '../../components/dashboard/GlassCard.vue'
</script>

<style scoped>
</style>