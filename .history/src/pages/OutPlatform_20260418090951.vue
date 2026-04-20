<template>
  <div>
    <AppLayout>
    
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 class="text-2xl font-semibold text-[var(--text-h)] mb-6">开放平台</h1>
          <p class="text-sm opacity-70 mb-8">接入各种外部平台服务，展示个人接入经验已经文档学习能力</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <OutPlatformCard 
              v-for="platform in platforms" 
              :key="platform.id" 
              :platform="platform" 
            />
          </div>
        </div>
      
    </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import AppLayout from '../components/dashboard/AppLayout.vue';
import OutPlatformCard from '../components/OutPlatform/OutPlatformCard.vue';

const platforms = ref([
  {
    id: 1,
    name: '支付宝开放平台',
    description: '支付宝开放平台将强大的支付、营销、数据能力。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Alipay%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['支付功能', '营销工具', '数据分析', '生活服务'],
    routeName: 'alipayPlatform'
  },
  {
    id: 2,
    name: '百度开放平台',
    description: '百度开放平台提供地图、搜索、AI等多种服务。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Baidu%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['百度地图', '百度搜索', 'AI 服务', '语音识别'],
    routeName: 'baiduPlatform'
  },
  {
    id: 3,
    name: '微信开放平台',
    description: '微信开放平台提供公众号、小程序等多种能力。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=WeChat%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['公众号', '小程序', '支付', '开放接口'],
    routeName: 'wechatPlatform'
  },
])
</script>
<style scoped>
</style>