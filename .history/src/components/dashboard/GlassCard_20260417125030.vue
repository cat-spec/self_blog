<template>
  <div
    class="rounded-2xl border border-[var(--border)]/80 bg-black/20 backdrop-blur shadow-[0_0_25px_rgba(170,59,255,0.05)] hover:border-[var(--accent-border)] transition-colors"
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

