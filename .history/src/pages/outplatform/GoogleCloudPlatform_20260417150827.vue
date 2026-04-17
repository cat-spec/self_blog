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
       <div class="state" v-if="!isLoading">
      <h5>定位结果:</h5>
      <span>城市 - {{ location.name }}</span>
      <span>纬度 - {{ location.point?.lat }}</span>
      <span>经度 - {{ location.point?.lng }}</span>
    </div>
    <div class="state" v-else>定位中...</div>
    <button v-if="!isLoading" @click="get">重新获取</button>
    <BMap enableScrollWheelZoom ref="map" :center="location.point || undefined" @initd="get">
      <template v-if="!isLoading">
        <BMarker :position="location.point"></BMarker>
      </template>
    </BMap>
        </el-tab-pane>
        <el-tab-pane label="API 文档" name="second"></el-tab-pane>

        <el-tab-pane label="示例代码" name="fourth"> </el-tab-pane>
      </el-tabs>
    </div>
  </AppLayout>
</template>

<script setup>
import { BMap,BCityList } from 'vue3-baidu-map-gl'
import { ref, onMounted } from "vue";
import AppLayout from "../../components/dashboard/AppLayout.vue";
let mapContainer = ref(null);
const activeName = ref("first");

// 地图初始化
// mapReady 回调函数，在地图加载完成后执行
 import { ref } from 'vue'
  import { useIpLocation } from 'vue3-baidu-map-gl'
  const map = ref()
  const { get, location, isLoading } = useIpLocation(() => {
    map.value.resetCenter()
  })


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
