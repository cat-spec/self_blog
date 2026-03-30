<template>
  <GlassCard>
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-[var(--text-h)] font-semibold">个人知识技术标签云</div>
        <div class="mt-2 text-xs opacity-70">点击标签 → 跳转知识花园并自动筛选分类</div>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-3">
      <button
        v-for="t in tags"
        :key="t.key"
        class="px-3 py-2 rounded-xl border border-[var(--border)]/70 bg-black/10 hover:border-[rgba(0,255,153,0.7)] transition-colors hover:bg-black/20"
        :style="tagStyle(t.weight)"
        @click="goGarden(t.label)"
        :aria-label="`filter tag ${t.label}`"
      >
        <span class="font-mono text-[var(--accent)]">#</span>
        <span class="ml-1 font-semibold text-[var(--text-h)]">{{ t.label }}</span>
      </button>
    </div>
  </GlassCard>
</template>

<script setup>
import { useRouter } from 'vue-router'
import GlassCard from './GlassCard.vue'

const props = defineProps({
  tags: {
    type: Array,
    required: true,
  },
})

const router = useRouter()

function goGarden(tag) {
  router.push({ path: '/garden', query: { tag } })
}

function tagStyle(weight) {
  // weight: 1..10
  const w = Math.max(1, Math.min(10, weight))
  const fontSize = 13 + w * 1.2 // 14.2..25
  const opacity = 0.75 + w * 0.02
  return { fontSize: `${fontSize}px`, opacity }
}
</script>

