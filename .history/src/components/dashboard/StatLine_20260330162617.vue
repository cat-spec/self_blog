<template>
  <div class="text-xs opacity-70">
    <div class="leading-tight">{{ label }}</div>
    <div class="text-sm font-mono text-[var(--accent)] mt-1">{{ value }}</div>
  </div>
</template>

<script setup>
// 该组件为统计数据行组件
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
})
</script>

