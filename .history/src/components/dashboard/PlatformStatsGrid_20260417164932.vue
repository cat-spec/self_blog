<template>
  <GlassCard>
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-[var(--text-h)] font-semibold">平台数据聚合</div>
        <div class="mt-2 text-xs opacity-70"></div>
      </div>
      <div class="text-xs opacity-80">每日早上7点更新</div>
    </div>

    <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- 平台统计数据聚合卡片插槽显示 -->
      <div
        v-for="p in platforms"
        :key="p.name"
        class="rounded-xl border border-[var(--border)]/80 bg-black/10 p-4 hover:border-[rgba(0,255,153,0.55)] transition-colors"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl border border-[var(--accent-border)]/50 bg-[var(--accent-bg)]/30 flex items-center justify-center"
            >
              <span class="text-lg">{{ p.icon }}</span>
            </div>
            <div>
              <div class="text-sm font-semibold text-[var(--text-h)]">{{ p.name }}</div>
              <a
                :href="p.link"
                target="_blank"
                rel="noreferrer"
                class="text-xs opacity-80 hover:text-[var(--link)] transition-colors"
              >
                {{ p.linkLabel }}
              </a>
            </div>
          </div>
        </div>
        <div v-if="p.name!='leetcode'" class="grid grid-cols-2 gap-x-4 gap-y-3">
          <StatLine label="文章数" :value="p.stats.articles" />
          <StatLine label="粉丝数" :value="p.stats.fans" />
          <StatLine label="点赞数" :value="p.stats.likes" />
          <StatLine label="阅读量" :value="p.stats.reads" />
        </div>
         <div v-if="p.name=='leetcode'" class="grid grid-cols-2 gap-x-4 gap-y-3"> 
          <StatLine label="解题/总题" value="62/4290" />
          <StatLine label="通过率" value="43%" />
        </div>
      </div>
    </div>
  </GlassCard>
</template>

<script setup>
// 该组件为平台统计数据聚合组件
import { defineProps } from 'vue'
import GlassCard from './GlassCard.vue'
import StatLine from './StatLine.vue'

const props = defineProps({
  platforms: {
    type: Array,
    required: true,
  },
})

const platforms = props.platforms
</script>

