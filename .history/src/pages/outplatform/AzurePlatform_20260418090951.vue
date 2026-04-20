<template>
  <AppLayout>
    <template #content>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Microsoft%20Azure%20logo%20icon%20simple%20flat%20design&image_size=square" alt="Azure" class="w-5 h-5" />
          </div>
          <h1 class="text-2xl font-semibold text-[var(--text-h)]">Microsoft Azure 平台</h1>
        </div>
        
        <div class="mb-8">
          <p class="text-sm opacity-70">微软云平台，提供企业级云服务，帮助组织构建、部署和管理应用程序。</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">计算服务</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>虚拟机</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>App Service（Web 应用）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Functions（无服务器）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Kubernetes Service（容器服务）</span>
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">存储服务</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Blob 存储</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>File 存储</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Queue 存储</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Table 存储</span>
              </li>
            </ul>
          </GlassCard>
        </div>
        
        <div class="mt-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">AI 与机器学习</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">Cognitive Services</h4>
                <p class="text-xs opacity-70">认知服务 API</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">Machine Learning</h4>
                <p class="text-xs opacity-70">机器学习服务</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">Bot Service</h4>
                <p class="text-xs opacity-70">机器人服务</p>
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