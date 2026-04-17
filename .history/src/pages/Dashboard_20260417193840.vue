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
import { usePlatformStore } from '../stores/platformStore'
// import { getPlatformStats } from '../api/platform'

async function getPlatform(){
  const platformStore = usePlatformStore()
  const {data} = await getPlatformStats()
  if(res.success){
    platformStore.platformStats = res.data
  }
  console.log(data.value)
}



const platforms = [
  {
    name: '掘金',
    icon: 'Jue',
    link: 'https://juejin.cn/user/2483126344625816',
    linkLabel: '查看掘金主页',
    stats: { articles: 0, fans: 0, likes: 1, reads: 35 },
  },
  {
    name: 'CSDN',
    icon: 'CSD',
    link: 'https://blog.csdn.net/coffee_nice?ops_request_misc=%7B%22request%5Fid%22%3A%22d911c78f680ae640106e9cd4b2636b75%22%2C%22scm%22%3A%2220140713.130064515..%22%7D&request_id=d911c78f680ae640106e9cd4b2636b75&biz_id=206&utm_medium=distribute.pc_search_result.none-task-user-null-1-141731973-null-null.nonecase&utm_term=%E8%8F%A0%E8%90%9D%E5%90%9B%7E&spm=1018.2226.3001.4351',
    linkLabel: '查看 CSDN 主页',
    stats: { articles: 2, fans:1, likes: 14, reads: 613 },
  },
  {
    name: 'leetcode',
    icon: 'Leet',
    link: 'https://leetcode.com/',
    linkLabel: '查看leetcode主页',
    stats: { articles: 0, fans: 0, likes: 0, reads: 0 },
  },
  {
    name: '思否',
    icon: 'SiF',
    link: 'https://segmentfault.com/',
    linkLabel: '查看思否主页',
    stats: { articles: 0, fans: 0, likes: 0, reads: 0 },
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

