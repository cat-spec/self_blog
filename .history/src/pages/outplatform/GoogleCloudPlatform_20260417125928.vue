<template>
  <AppLayout>
    <template #content>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Google%20Cloud%20logo%20icon%20simple%20flat%20design&image_size=square" alt="Google Cloud" class="w-5 h-5" />
          </div>
          <h1 class="text-2xl font-semibold text-[var(--text-h)]">Google Cloud 平台</h1>
        </div>
        
        <div class="mb-8">
          <p class="text-sm opacity-70">Google Cloud 提供云存储、计算和人工智能服务，帮助开发者构建、部署和扩展应用程序。</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">计算服务</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Compute Engine（虚拟机）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>App Engine（托管服务）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Cloud Functions（无服务器）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Kubernetes Engine（容器编排）</span>
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">存储服务</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Cloud Storage（对象存储）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Cloud SQL（关系型数据库）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Firestore（NoSQL 数据库）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>BigQuery（数据分析）</span>
              </li>
            </ul>
          </GlassCard>
        </div>
        
        <div class="mt-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">AI 服务</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">Vision API</h4>
                <p class="text-xs opacity-70">图像识别和分析</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">Natural Language API</h4>
                <p class="text-xs opacity-70">自然语言处理</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">Translate API</h4>
                <p class="text-xs opacity-70">多语言翻译</p>
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