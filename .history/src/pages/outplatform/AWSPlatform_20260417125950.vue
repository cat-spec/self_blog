<template>
  <AppLayout>
    <template #content>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AWS%20logo%20icon%20simple%20flat%20design&image_size=square" alt="AWS" class="w-5 h-5" />
          </div>
          <h1 class="text-2xl font-semibold text-[var(--text-h)]">AWS 平台</h1>
        </div>
        
        <div class="mb-8">
          <p class="text-sm opacity-70">亚马逊云服务，提供全面的云计算解决方案，帮助企业和开发者构建可靠、可扩展的应用。</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">计算服务</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>EC2（弹性云服务器）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Lambda（无服务器计算）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>ECS/EKS（容器服务）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Batch（批处理）</span>
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">存储服务</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>S3（对象存储）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>EBS（块存储）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>Glacier（归档存储）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>DynamoDB（NoSQL 数据库）</span>
              </li>
            </ul>
          </GlassCard>
        </div>
        
        <div class="mt-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">数据库服务</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">RDS</h4>
                <p class="text-xs opacity-70">关系型数据库服务</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">DynamoDB</h4>
                <p class="text-xs opacity-70">NoSQL 数据库</p>
              </div>
              <div>
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">ElastiCache</h4>
                <p class="text-xs opacity-70">内存缓存服务</p>
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