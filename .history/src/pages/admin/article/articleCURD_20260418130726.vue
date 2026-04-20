<template>
  <div>
<el-table :data="tableData" style="width: 100%" height="">
    <el-table-column fixed prop="created_at" label="创建时间" width="" />
    <el-table-column prop="title" label="标题" width="" />
    <el-table-column prop="description" label="描述" width="" />
    <el-table-column label="操作" width="">
      <template #default="scope">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="danger" size="mini" @click="deleteArticle(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
 <div style="display: flex;justify-content: flex-end;margin: 10px;">
     <el-button type="primary" round @click="addArticle">增加文章</el-button>
 </div>
 <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>


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
// 删除文章
const deleteArticle = async (id) => {
    console.log(id)
//   const res = await deleteArticleAPI(id)
//     if (res.status === 200) {
//       tableData.value = tableData.value.filter(item => item.id !== id)
//       ElMessage.success('删除成功')
//     }
    console.log(tableData.value)
}
// 增加文章
const dialogFormVisible = ref(false)
const form = reactive({
  name: '',
  region: ''
})
const formLabelWidth = '120px'
const addArticle = () => {
  dialogFormVisible.value = true
}







</script>
<style scoped lang="less">
</style>