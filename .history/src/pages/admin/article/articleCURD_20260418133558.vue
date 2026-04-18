<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="">
      <el-table-column fixed prop="created_at" label="创建时间" width="" />
      <el-table-column prop="title" label="标题" width="" />
      <el-table-column prop="description" label="描述" width="" />
      <el-table-column label="操作" width="">
        <template #default="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteArticle(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: flex-end; margin: 10px">
      <el-button type="primary" round @click="addArticle">增加文章</el-button>
    </div>
    <!-- 增加文章弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="增加文章" width="500">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上传文章" :label-width="formLabelWidth">
          <div class="upload-area">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept=".md"
      /></div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">
            上传文章
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
import { getArticleList } from "@/api/artical";

const tableData = ref([]);
onMounted(async () => {
  const res = await getArticleList();
  if (res.status === 200) {
    tableData.value = res.data.data;
  }
  console.log(tableData.value);
});
// 删除文章
const deleteArticle = async (id) => {
  console.log(id);
  //   const res = await deleteArticleAPI(id)
  //     if (res.status === 200) {
  //       tableData.value = tableData.value.filter(item => item.id !== id)
  //       ElMessage.success('删除成功')
  //     }
  console.log(tableData.value);
};
// 增加文章
const dialogFormVisible = ref(false);
const form = reactive({
  title: "",
  description: "",
});
const selectedFile = ref(null)
const handleFileChange = (e) => {
  const file = e.target.files[0]
  console.log(file);
  selectedFile.value = file
}
const submitForm = async () => {
    dialogFormVisible.value = false
  if (!selectedFile.value) {
    ElMessage.error('请上传文章')
    return
  }else{
     const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('title', form.title)
  formData.append('description', form.description)
  let res=await uploadArticle(formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // 上传进度监听（可选）
    })
    if (res.status === 200) {
      ElMessage.success('上传成功')
    }
  }
}


const formLabelWidth = "120px";
const addArticle = () => {
  dialogFormVisible.value = true;


};
</script>
<style scoped lang="less"></style>
