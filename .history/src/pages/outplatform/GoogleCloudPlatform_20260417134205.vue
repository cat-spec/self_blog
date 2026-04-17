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
import AppLayout from "../../components/dashboard/AppLayout.vue";
import GlassCard from "../../components/dashboard/GlassCard.vue";

</script>

<style scoped></style>
