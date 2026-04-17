<template>
  <AppLayout>
    
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-10 h-10 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Alipay%20logo%20icon%20simple%20flat%20design&image_size=square" alt="支付宝" class="w-5 h-5" />
          </div>
          <h1 class="text-2xl font-semibold text-[var(--text-h)]">支付宝开放平台</h1>
        </div>
        
        <div class="mb-8">
          <p class="text-sm opacity-70">支付宝开放平台将强大的支付、营销、数据能力开放给开发者，帮助开发者实现商业价值。</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">支付功能</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>扫码支付</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>APP 支付</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>手机网站支付</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>电脑网站支付</span>
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">营销功能</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>优惠券</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>红包</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>会员卡</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-[var(--accent)]">•</span>
                <span>积分</span>
              </li>
            </ul>
          </GlassCard>
        </div>
        
        <div class="mt-6">
          <GlassCard>
            <h3 class="text-sm font-semibold text-[var(--text-h)] mb-3">接入流程</h3>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">1. 注册开发者</h4>
                <p class="text-xs opacity-70">在支付宝开放平台注册开发者账号</p>
              </div>
              <div class="flex-1">
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">2. 创建应用</h4>
                <p class="text-xs opacity-70">创建应用并获取 AppID</p>
              </div>
              <div class="flex-1">
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">3. 配置密钥</h4>
                <p class="text-xs opacity-70">生成并配置 RSA 密钥</p>
              </div>
              <div class="flex-1">
                <h4 class="text-xs font-medium text-[var(--accent)] mb-2">4. 集成 SDK</h4>
                <p class="text-xs opacity-70">集成支付宝 SDK 到项目中</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../../components/dashboard/AppLayout.vue'
import GlassCard from '../../components/dashboard/GlassCard.vue'
</script>

<style scoped>
</style>