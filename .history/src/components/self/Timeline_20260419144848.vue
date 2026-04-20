<template>
  <div class="timeline">
    <div v-if="items.length === 0" class="empty-state">
      <i class="fas fa-hourglass-half"></i>
      <strong>暂无经历记录</strong>
      <p>时间轴尚未添加内容。</p>
    </div>
    <TimelineItem
      v-for="item in sortedItems"
      :key="item.id"
      :period="item.period"
      :title="item.title"
      :subtitle="item.subtitle"
      :description="item.description"
      :tags="item.tags"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TimelineItem from './TimelineItem.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
console.log("---------------------------------")
console.log(props.items)

// 按时间段起始年份降序排列（最近的在最上）
const sortedItems = computed(() => {
  return [...props.items].sort((a, b) => {
    const yearA = parseInt(a.period.split('-')[0].trim())
    const yearB = parseInt(b.period.split('-')[0].trim())
    if (isNaN(yearA)) return 1
    if (isNaN(yearB)) return -1
    return yearB - yearA
  })
})
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 20px;
  margin-top: 1rem;
}

/* 全局垂直线 */
.timeline::before {
  content: '';
  position: absolute;
  left: 180px;
  top: 12px;
  bottom: 12px;
  width: 2.5px;
  background: linear-gradient(to bottom, #94a3b8, #3b82f6, #94a3b8);
  border-radius: 4px;
  opacity: 0.7;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f8fafc;
  border-radius: 2rem;
  color: #64748b;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

/* 移动端隐藏全局线 */
@media (max-width: 760px) {
  .timeline {
    padding-left: 0;
  }
  .timeline::before {
    display: none;
  }
}
</style>