<template>
  <AppLayout>
    <h1 class="mb-8 text-2xl font-semibold text-[var(--text-h)]">百度开放平台</h1>
    <div class="p-4">
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="地图展示" name="first">
          <div class="map-container">
            <div id="map" class="map"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="API 文档" name="second">
          <div class="p-4">
            <p class="text-sm">百度开放平台提供了丰富的 API 接口，包括地图、搜索、AI 等服务。</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="接入指南" name="third">
          <div class="p-4">
            <p class="text-sm">1. 注册百度开发者账号</p>
            <p class="text-sm mt-2">2. 创建应用并获取 AK 密钥</p>
            <p class="text-sm mt-2">3. 集成百度地图 SDK</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="示例代码" name="fourth">
          <div class="p-4">
            <code class="text-xs bg-[var(--code-bg)] p-2 rounded">
              // 初始化百度地图<br>
              const map = new BMapGL.Map('container');<br>
              map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15);
            </code>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from "../../components/dashboard/AppLayout.vue";

const activeName = ref('first');

// 地图中心点坐标 (例如：北京天安门)
const center = ref({ lng: 116.404, lat: 39.915 })
// 地图缩放级别
const zoom = ref(15)
// 标记点位置
const marker = ref({
  position: { lng: 116.404, lat: 39.915 }
})
// 信息窗口数据
const infoWindow = ref({
  show: false,
  content: '你好，这里是天安门广场！'
})

// 地图实例就绪后的回调
const handleMapReady = ({ map }) => {
  console.log('地图加载完成', map)
}

// 点击标记时打开信息窗口
const openInfoWindow = () => {
  infoWindow.value.show = true
}

const handleClick = (tab) => {
  console.log(tab);
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
