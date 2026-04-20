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
    description: '提供云存储、计算和人工智能服务',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Google%20Cloud%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['云存储', '虚拟机', 'AI 服务', '数据库'],
    routeName: 'googleCloudPlatform'
  },
  {
    id: 3,
    name: '微信开放平台',
    description: '亚马逊云服务，提供全面的云计算解决方案',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AWS%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['EC2', 'S3', 'Lambda', 'DynamoDB'],
    routeName: 'awsPlatform'
  },
])
</script>
<style scoped>
</style>