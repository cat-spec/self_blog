<template>
  <div class="timeline-item">
    <div class="timeline-period">
      <span class="period-badge">
        <i class="far fa-calendar-alt"></i> {{ period }}
      </span>
    </div>
    <div class="timeline-dot"></div>
    <div class="timeline-card">
      <div class="card-header">
        <div>
          <div class="card-title">{{ title }}</div>
          <div class="card-sub">
            <i class="fas fa-building"></i> {{ displaySubtitle }}
          </div>
        </div>
        <!-- 无任何操作按钮 -->
      </div>
      <div class="card-description">
        {{ displayDescription }}
      </div>
      <div v-if="tags && tags.length" class="tag-group">
        <span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
 const props = defineProps({
  period: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: () => []
  }
})

console.log(props.subtitle)

const displaySubtitle = (props) => props.subtitle || '未指定机构'
const displayDescription = (props) => props.description || '暂无详细描述，这段经历值得铭记。'
</script>

<style scoped>
.timeline-item {
  position: relative;
  display: flex;
  margin-bottom: 2.5rem;
  transition: all 0.2s;
}

.timeline-period {
  width: 160px;
  flex-shrink: 0;
  padding-right: 20px;
  font-weight: 700;
  font-size: 1rem;
  color: #1e40af;
  letter-spacing: -0.2px;
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
}

.period-badge {
  background: #e0f2fe;
  padding: 4px 10px;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0369a1;
}

.timeline-dot {
  position: absolute;
  left: 154px;
  top: 24px;
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  z-index: 2;
  transition: 0.2s;
}

.timeline-card {
  flex: 1;
  margin-left: 28px;
  background: white;
  border-radius: 28px;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(203, 213, 225, 0.5);
}

.timeline-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.2);
  border-color: #b9d0f0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
}

.card-sub {
  font-weight: 500;
  color: #3b82f6;
  font-size: 0.85rem;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-description {
  color: #334155;
  line-height: 1.5;
  font-size: 0.9rem;
  margin: 12px 0 12px 0;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #1e293b;
  letter-spacing: 0.3px;
}

/* 移动端适配 */
@media (max-width: 760px) {
  .timeline-item {
    flex-direction: column;
    margin-bottom: 1.8rem;
  }
  .timeline-period {
    width: 100%;
    padding-right: 0;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .timeline-dot {
    display: none;
  }
  .timeline-card {
    margin-left: 0;
    width: 100%;
  }
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>