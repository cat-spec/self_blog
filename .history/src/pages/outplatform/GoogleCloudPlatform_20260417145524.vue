<template>
  <AppLayout>
    <h1 class="mb-8 text-2xl font-semibold text-[var(--text-h)]">
      百度开放平台
    </h1>
    <div class="p-4">
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="地图展示" name="first">
          <div style="width: 100%; height: 600px;">
    <baidu-map
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="15"
      @ready="mapReady"
    >
      <!-- 可以在这里添加标记等 -->
    </baidu-map>
  </div>
        </el-tab-pane>
        <el-tab-pane label="API 文档" name="second"></el-tab-pane>

        <el-tab-pane label="示例代码" name="fourth"> </el-tab-pane>
      </el-tabs>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AppLayout from "../../components/dashboard/AppLayout.vue";
let mapContainer = ref(null);
const activeName = ref("first");

// 地图初始化



// 页面加载完成后初始化地图
onMounted(() => {
  initMap();
});
function initMap() {
  if (window.BMapGL) {
    createMap();
  }
}
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  background-color: aqua;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
