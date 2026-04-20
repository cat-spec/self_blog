<template>
  <div>
<el-table :data="tableData" style="width: 100%" height="250">
    <el-table-column fixed prop="date" label="Date" width="" />
    <el-table-column prop="name" label="Name" width="" />
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