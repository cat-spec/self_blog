<template>
  <div
    class="rounded-2xl border border-[var(--border)]/80 bg-black/20 backdrop-blur shadow-[0_0_25px_rgba(0,255,153,0.05)] hover:border-[rgba(0,255,153,0.55)] transition-colors"
  >
    <div class="p-4 sm:p-5">
      <slot />
    </div>
  </div>
</template>

<script setup>
// 该组件为玻璃卡片组件
// Presentational only
</script>

