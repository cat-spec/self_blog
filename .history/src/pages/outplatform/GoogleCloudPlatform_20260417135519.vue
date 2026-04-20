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
          <div id="map-container"></div>
        </el-tab-pane>
        <el-tab-pane label="API 文档" name="second"></el-tab-pane>
          
        <el-tab-pane label="示例代码" name="fourth">
         
        </el-tab-pane>
      </el-tabs>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppLayout from "../../components/dashboard/AppLayout.vue";

const activeName = ref('first');

// 地图初始化
const initMap = () => {
  // 创建地图实例
  const map = new BMapGL.Map('map');
  
  // 设置中心点坐标
  const point = new BMapGL.Point(116.404, 39.915);
  
  // 初始化地图，设置中心点坐标和缩放级别
  map.centerAndZoom(point, 15);
  
  // 添加地图类型控件
  map.addControl(new BMapGL.MapTypeControl({
    mapTypes: [
      BMAP_NORMAL_MAP,
      BMAP_HYBRID_MAP
    ]
  }));
  
  // 启用滚轮放大缩小
  map.enableScrollWheelZoom(true);
  
  // 添加标记点
  const marker = new BMapGL.Marker(point);
  map.addOverlay(marker);
  
  // 添加信息窗口
  const infoWindow = new BMapGL.InfoWindow('你好，这里是天安门广场！');
  
  // 点击标记点打开信息窗口
  marker.addEventListener('click', function() {
    map.openInfoWindow(infoWindow, point);
  });
  
  console.log('地图加载完成', map);
}

// 页面加载完成后初始化地图
onMounted(() => {
  initMap();
});

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
