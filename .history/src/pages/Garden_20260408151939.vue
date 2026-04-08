<template>
  <AppLayout>
    <div class="space-y-6">
      <GlassCard>
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-[var(--text-h)] font-semibold text-lg">知识花园</div>
            <div class="mt-2 text-xs opacity-70">
              点击首页标签云可带参数筛选分类（`?tag=Vue`）。
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-if="activeTag"
              class="h-9 px-3 rounded-lg bg-black/20 border border-[var(--border)]/80 hover:border-[var(--accent)]/40 text-sm"
              @click="clearTag"
            >
              清除筛选
            </button>
          </div>
        </div>
      </GlassCard>

     <router-link to="">
       <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
        :class="notesFiltered.length === 0 ? 'opacity-80' : ''"
      >
        <div
          v-for="n in notesFiltered"
          :key="n.id"
          class="rounded-2xl border border-[var(--border)]/80 bg-black/15 p-5 hover:border-[rgba(0,255,153,0.55)] transition-colors"
        >
          <div class="flex items-center justify-between gap-4 mb-3">
            <h3 class="text-[var(--text-h)] font-semibold leading-tight">{{ n.title }}</h3>
            <div class="text-xs opacity-70 font-mono">{{ n.date }}</div>
          </div>

          <p class="text-sm opacity-80 leading-relaxed">{{ n.snippet }}</p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="t in n.tags"
              :key="t"
              class="text-xs px-2 py-1 rounded-lg border border-[var(--border)]/70 bg-black/10"
            >
              #{{ t }}
            </span>
          </div>
        </div>
      </div>
     </router-link>

      <div v-if="notesFiltered.length === 0" class="text-sm opacity-70">
        暂无内容：`{{ activeTag }}` 对应的笔记还在准备中。
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/dashboard/AppLayout.vue'
import GlassCard from '../components/dashboard/GlassCard.vue'

const route = useRoute()
const router = useRouter()

const activeTag = computed(() => {
  const tag = route.query.tag
  return typeof tag === 'string' && tag.trim() ? tag : ''
})

const notes = [
  {
    id: 'n1',
    title: 'Vue3 响应式原理速览',
    date: '2026-03-20',
    tags: ['Vue', 'TypeScript'],
    snippet: '从 Proxy 到依赖收集，再到调度与批处理，掌握响应式的核心链路。',
  },
  {
    id: 'n2',
    title: 'Node/Express 中间件设计模式',
    date: '2026-03-12',
    tags: ['Node', 'Express', 'GraphQL'],
    snippet: '如何把鉴权、日志、限流等逻辑抽离成可组合的中间件。',
  },
  {
    id: 'n3',
    title: 'Rust：用所有权写安全并发',
    date: '2026-02-28',
    tags: ['Rust'],
    snippet: '从 borrow checker 到线程安全，理解 Rust 如何在编译期消除数据竞争。',
  },
  {
    id: 'n4',
    title: 'Tailwind 极简构建高可维护 UI',
    date: '2026-02-11',
    tags: ['Tailwind', 'Vue'],
    snippet: '通过设计系统思维，把样式从“堆类名”升级为“组合能力”。',
  },
]

const notesFiltered = computed(() => {
  if (!activeTag.value) return notes
  // tags 里存的是大写标签；首页 query 传入 label（可能是 Vue/React）
  return notes.filter((n) => n.tags.some((t) => t.toLowerCase() === activeTag.value.toLowerCase()))
})

function clearTag() {
  router.push({ path: '/garden' })
}
</script>

