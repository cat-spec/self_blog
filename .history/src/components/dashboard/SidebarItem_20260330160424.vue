<template>
  <router-link
    v-if="!disabled"
    :to="to"
    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-[var(--border)]/80 hover:bg-black/10"
    :class="active ? 'bg-[var(--accent-bg)]/60 border-[var(--accent-border)]/60 text-[var(--accent)]' : 'text-[var(--text-h)]/80'"
  >
    <span class="text-base">{{ icon }}</span>
    <span class="text-sm font-medium">{{ label }}</span>
  </router-link>

  <div
    v-else
    class="flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent text-[var(--text-h)]/40 cursor-not-allowed"
  >
    <span class="text-base">{{ icon }}</span>
    <span class="text-sm font-medium">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
})

const route = useRoute()
const active = computed(() => !props.disabled && route.path === props.to)
</script>

