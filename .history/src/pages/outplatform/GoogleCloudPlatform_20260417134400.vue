<template>
  <AppLayout>
    <h1 class="mb-8 text-2xl font-semibold text-[var(--text-h)]">百度开放平台</h1>
    <div style="color: white">
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="地图展示" name="first">
          <baidu-map class="map" :center="center" :zoom="zoom" @ready="handleMapReady">
      <!-- 标记点组件 -->
      <bm-marker :position="marker.position" @click="openInfoWindow">
        <!-- 信息窗口组件 -->
        <bm-info-window :show="infoWindow.show" @close="infoWindow.show = false">
          <p>{{ infoWindow.content }}</p>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
        
        
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from "../../components/dashboard/AppLayout.vue";
import GlassCard from "../../components/dashboard/GlassCard.vue";

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
</script>

<style scoped></style>
