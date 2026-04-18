<template>
  <AppLayout>
    <div class="space-y-6">
      <GlassCard style="margin-bottom: 20px;">
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

     <router-link to="/garden/detail">
       <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4"
        :class="notesFiltered.length === 0 ? 'opacity-80' : ''"
      >
        <div
          v-for="n in notes"
          :key="n.id"
          class="rounded-2xl border border-[var(--border)]/80 bg-black/15 p-5 hover:border-[rgba(0,255,153,0.55)] transition-colors"
        >
          <div class="flex items-center justify-between gap-4 mb-3">
            <h3 class="text-[var(--text-h)] font-semibold leading-tight">{{ n.title }}</h3>
            <div class="text-xs opacity-70 font-mono">{{ n.created_at }}</div>
          </div>

          <p class="text-sm opacity-80 leading-relaxed">{{ n.description }}</p>

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
import { computed,ref,onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/dashboard/AppLayout.vue'
import GlassCard from '../components/dashboard/GlassCard.vue'
import { getArticleList } from '../api/artical'

const route = useRoute()
const router = useRouter()

const activeTag = computed(() => {
  const tag = route.query.tag
  return typeof tag === 'string' && tag.trim() ? tag : ''
})

const notes = ref([])
const getNotes = async () => {
  const res = await getArticleList()
  notes.value = res.data.data
  console.log(notes.value);
}
onMounted(() => {
  getNotes()
})



const notesFiltered = computed(() => {
  if (!activeTag.value) return notes
  // tags 里存的是大写标签；首页 query 传入 label（可能是 Vue/React）
  return notes.filter((n) => n.tags.some((t) => t.toLowerCase() === activeTag.value.toLowerCase()))
})

function clearTag() {
  router.push({ path: '/garden' })
}
</script>

