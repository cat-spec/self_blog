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
          <div ref="map" id="map-container"></div>
        </el-tab-pane>
        <el-tab-pane label="API 文档" name="second"></el-tab-pane>
          
        <el-tab-pane label="示例代码" name="fourth">
         
        </el-tab-pane>
      </el-tabs>
    </div>
  </AppLayout>
</template>

<script setup src="https://api.map.baidu.com/api?v=1.0&type=webgl&ak=IXkFtHDFk0dZ8GXqYWXfMr3kyV8Tltz5">
import { ref, onMounted } from 'vue'
import AppLayout from "../../components/dashboard/AppLayout.vue";
let map = ref(null);
const activeName = ref('first');

// 地图初始化


// 页面加载完成后初始化地图
onMounted(() => {
 
});
function initMap() {
      // 确保BMapGL对象已加载
      if (window.BMapGL) {
        const map = new BMapGL.Map('map-container'); // 创建地图实例
        map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11); // 设置中心点和缩放级别
      }
}


</script>

<style scoped>
.map-container {
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
