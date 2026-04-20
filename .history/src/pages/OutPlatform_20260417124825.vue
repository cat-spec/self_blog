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
import OutPlatformCard from '../components/dashboard/OutPlatformCard.vue';

const platforms = ref([
  {
    id: 1,
    name: '支付宝开放平台',
    description: '支付宝开放平台将强大的支付、营销、数据能力。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=GitHub%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['代码托管', 'CI/CD', 'Issue 管理', 'Pull Request']
  },
  {
    id: 2,
    name: 'Google Cloud',
    description: '提供云存储、计算和人工智能服务',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Google%20Cloud%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['云存储', '虚拟机', 'AI 服务', '数据库']
  },
  {
    id: 3,
    name: 'AWS',
    description: '亚马逊云服务，提供全面的云计算解决方案',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AWS%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['EC2', 'S3', 'Lambda', 'DynamoDB']
  },
  {
    id: 4,
    name: 'Microsoft Azure',
    description: '微软云平台，提供企业级云服务',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Microsoft%20Azure%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['虚拟机', 'Blob 存储', 'AI 服务', 'DevOps']
  },
  {
    id: 5,
    name: 'Slack',
    description: '团队协作平台，提供消息和文件共享功能',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Slack%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['团队通讯', '文件共享', '集成应用', '频道管理']
  },
  {
    id: 6,
    name: 'Twitter',
    description: '社交媒体平台，用于实时信息分享',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Twitter%20logo%20icon%20simple%20flat%20design&image_size=square',
    features: ['推文发布', '社交互动', '趋势分析', 'API 集成']
  }
])
</script>
<style scoped>
</style>