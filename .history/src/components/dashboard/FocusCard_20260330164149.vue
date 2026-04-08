<template>
  <GlassCard>
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-[var(--text-h)] font-semibold">智能待办 · Focus</div>
        <div class="mt-2 text-xs opacity-70">今日目标 + 里程碑 + 番茄钟（基础功能已实现）</div>
      </div>
    </div>

    <div class="mt-5 space-y-5">
      <section>
        <div class="text-sm font-semibold text-[var(--text-h)] mb-3">今日目标</div>
        <div class="space-y-2">
          <label
            v-for="t in todos"
            :key="t.id"
            class="flex items-center gap-2 text-sm opacity-90 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              v-model="todoState[t.id]"
              class="w-4 h-4 accent-[var(--accent)]"
            />
            <span class="leading-tight" :class="todoState[t.id] ? 'line-through opacity-60' : ''">
              {{ t.text }}
            </span>
          </label>
        </div>
      </section>

      <section>
        <div class="text-sm font-semibold text-[var(--text-h)] mb-3">里程碑进度</div>
        <div class="flex items-baseline justify-between mb-2">
          <div class="text-xs opacity-70">距 1k Star 还差</div>
          <div class="text-sm font-mono text-[var(--accent)]">{{ remainingToGoal }}</div>
        </div>
        <div class="h-2 rounded-full bg-white/10 overflow-hidden border border-white/5">
          <div
            class="h-full bg-[var(--accent)]"
            :style="{ width: `${progressPercent}%`, boxShadow: '0 0 18px rgba(0,255,153,0.35)' }"
          />
        </div>
        <div class="mt-2 text-xs opacity-70 flex justify-between">
          <span>{{ currentStars }} / 1000</span>
          <span>{{ Math.round(progressPercent) }}%</span>
        </div>
      </section>

      <section>
        <div class="text-sm font-semibold text-[var(--text-h)] mb-3">番茄钟</div>
        <div class="flex items-center justify-between gap-4">
          <div class="text-sm opacity-80">
            当前会话
            <span class="font-mono text-[var(--accent)] ml-2">{{ formatTime(remainingSeconds) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="h-9 px-3 rounded-lg bg-black/20 border border-[var(--border)]/80 hover:border-[var(--accent)]/40 text-sm"
              @click="toggle"
            >
              {{ isRunning ? '暂停' : '开始' }}
            </button>
            <button
              class="h-9 px-3 rounded-lg bg-black/20 border border-[var(--border)]/80 hover:border-[var(--accent)]/40 text-sm"
              @click="reset"
            >
              重置
            </button>
          </div>
        </div>
      </section>
      <section>
        <div class="text-sm font-semibold text-[var(--text-h)] mb-3">个人精彩作品</div>
        
      </section>
    </div>
  </GlassCard>
</template>

<script setup>
// 该组件为智能待办 · Focus 组件
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import GlassCard from './GlassCard.vue'

const todos = ref([
  { id: 'leetcode', text: '刷 LeetCode 3题' },
  { id: 'read', text: '阅读一篇技术深度文章' },
  { id: 'write', text: '整理一段知识笔记并发布' },
])

const todoState = reactive({})
todos.value.forEach((t) => {
  todoState[t.id] = false
})

// 示例里程碑
const currentStars = ref(955)
const goalStars = ref(1000)

const remainingToGoal = computed(() => Math.max(0, goalStars.value - currentStars.value))
const progressPercent = computed(() =>
  Math.min(100, (currentStars.value / goalStars.value) * 100),
)

// Pomodoro（25分钟）
const pomodoroSec = 25 * 60
const remainingSeconds = ref(pomodoroSec)
const isRunning = ref(false)

let timerId = null

function formatTime(total) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

function start() {
  if (isRunning.value) return
  isRunning.value = true
  clearTimer()

  timerId = setInterval(() => {
    if (remainingSeconds.value <= 0) {
      pause()
      return
    }
    remainingSeconds.value -= 1
  }, 1000)
}

function pause() {
  isRunning.value = false
  clearTimer()
}

function toggle() {
  isRunning.value ? pause() : start()
}

function reset() {
  pause()
  remainingSeconds.value = pomodoroSec
}

onBeforeUnmount(() => {
  clearTimer()
})
</script>

