<template>
  <div>
<el-table :data="tableData" style="background-color: #f5f7fa; width: 95%" height="250">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="" />
    <el-table-column prop="city" label="City" width="" />
    <el-table-column prop="address" label="Address" width="" />
    <el-table-column prop="zip" label="Zip" />
  </el-table>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },]

</script>
<style scoped lang="less">
</style>