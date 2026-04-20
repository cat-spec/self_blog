<template>
  <div>
<el-table :data="tableData" style="width: 90%" height="">
    <el-table-column fixed prop="date" label="Date" width="" />
    <el-table-column prop="name" label="Name" width="" />
    <el-table-column prop="state" label="State" width="" />
    <el-table-column prop="city" label="City" width="" />
    <el-table-column prop="address" label="Address" width="" />
    <el-table-column prop="zip" label="Zip" />
    <el-table-column label="操作" width="">
      <template #default="scope">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 <div style="display: flex;justify-content: flex-end;margin: 10px;">
     <el-button type="primary" round>增加文章</el-button>
 </div>
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