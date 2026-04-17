<template>
  <AppLayout>
      <h1 class="text-2xl font-semibold text-[var(--text-h)]">支付宝开放平台</h1>
       <el-tabs type="border-card">
    <el-tab-pane label="User">User</el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../../components/dashboard/AppLayout.vue'
</script>

<style scoped>
</style>