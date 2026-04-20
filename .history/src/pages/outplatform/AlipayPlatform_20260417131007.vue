<template>
  <AppLayout>
      <h1 class="text-2xl font-semibold text-[var(--text-h)]">支付宝开放平台</h1>
      <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs text-white"
    @tab-click="handleClick"
  >
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../../components/dashboard/AppLayout.vue'
</script>

<style scoped>
</style>