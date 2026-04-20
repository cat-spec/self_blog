<template>
  <div>
<el-table :data="tableData" style="width: 100%" height="">
    <el-table-column fixed prop="created_at" label="创建时间" width="" />
    <el-table-column prop="title" label="标题" width="" />
    <el-table-column prop="description" label="描述" width="" />
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
import { getArticleList } from '@/api/artical'
const tableData = ref([])
onMounted(async () => {
  const res = await getArticleList()
    if (res.status === 200) {
      tableData.value = res.data.data
    }
    console.log(tableData.value)
  })





</script>
<style scoped lang="less">
</style>