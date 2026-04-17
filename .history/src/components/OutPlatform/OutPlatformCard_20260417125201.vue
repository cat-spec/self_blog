<template>
  <OutPlatformCard class="platform-card">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-lg bg-[var(--accent-bg)] flex items-center justify-center">
        <img :src="platform.icon" :alt="platform.name" class="w-6 h-6" />
      </div>
      <div class="flex-1">
        <h3 class="text-sm font-semibold text-[var(--text-h)]">{{ platform.name }}</h3>
        <p class="mt-1 text-xs opacity-70">{{ platform.description }}</p>
        <div class="mt-2 flex flex-wrap gap-2">
          <span 
            v-for="feature in platform.features" 
            :key="feature" 
            class="text-xs px-2 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent)]"
          >
            {{ feature }}
          </span>
        </div>
      </div>
    </div>
  </OutPlatformCard>
</template>

<script setup>
import OutPlatformCard from '../OutPlatform/OutPlatformCard.vue'

const props = defineProps({
  platform: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      description: '',
      icon: '',
      features: []
    })
  }
})
</script>

<style scoped>
.platform-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.platform-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(170, 59, 255, 0.1);
}
</style>