<template>
  <AppLayout>
    <div class="space-y-6">
      <GitHubHeatmapCard />
      <div class="flex gap-6 items-stretch">
        <div class="flex-[0_0_60%]">
          <PlatformStatsGrid :platforms="platforms" />
        </div>
        <div class="flex-[0_0_40%]">
          <FocusCard />
        </div>
      </div>
      <TechTagCloudCard :tags="tags" />
    </div>
  </AppLayout>
</template>


<script setup>
import AppLayout from '../components/dashboard/AppLayout.vue'
import GitHubHeatmapCard from '../components/dashboard/GitHubHeatmapCard.vue'
import PlatformStatsGrid from '../components/dashboard/PlatformStatsGrid.vue'
import FocusCard from '../components/dashboard/FocusCard.vue'
import TechTagCloudCard from '../components/dashboard/TechTagCloudCard.vue'

const platforms = [
  {
    name: '掘金',
    icon: 'Jue',
    link: 'https://juejin.cn/',
    linkLabel: '查看掘金主页',
    stats: { articles: 38, fans: 1520, likes: 980, reads: 45200 },
  },
  {
    name: 'CSDN',
    icon: 'CSD',
    link: 'https://www.csdn.net/',
    linkLabel: '查看 CSDN 主页',
    stats: { articles: 24, fans: 860, likes: 620, reads: 23800 },
  },
  {
    name: '知乎',
    icon: 'Zhi',
    link: 'https://www.zhihu.com/',
    linkLabel: '查看知乎主页',
    stats: { articles: 12, fans: 520, likes: 310, reads: 9200 },
  },
  {
    name: '思否',
    icon: 'SiF',
    link: 'https://segmentfault.com/',
    linkLabel: '查看思否主页',
    stats: { articles: 16, fans: 420, likes: 280, reads: 11000 },
  },
]

const tags = [
  { key: 'vue', label: 'Vue', weight: 10 },
  { key: 'react', label: 'React', weight: 7 },
  { key: 'node', label: 'Node', weight: 8 },
  { key: 'ts', label: 'TypeScript', weight: 9 },
  { key: 'tailwind', label: 'Tailwind', weight: 6 },
  { key: 'rust', label: 'Rust', weight: 5 },
  { key: 'mysql', label: 'MySQL', weight: 6 },
  { key: 'vite', label: 'Vite', weight: 7 },
  { key: 'graphql', label: 'GraphQL', weight: 4 },
  { key: 'express', label: 'Express', weight: 7 },
]
</script>

