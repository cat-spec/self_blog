<template>
  <AppLayout>
    <h1 class="mb-8 text-2xl font-semibold text-[var(--text-h)]">微信开放平台</h1>
    <div style="color: white">
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="基本信息" name="first">
          <div class="p-4">
            <p>微信开放平台提供多种接口和能力，支持开发者构建各类应用。</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from "../../components/dashboard/AppLayout.vue";

const activeName = ref('first');

const handleClick = (tab) => {
  console.log(tab);
};
</script>

<style scoped></style>