<template>
  <div>
    <AppLayout>
      <div class="markdown-editor">
    <h2>📝 Markdown 实时编辑器</h2>
    <div class="panels">
      <!-- 左侧编辑区 -->
      <div class="editor">
        <textarea
          v-model="source"
          placeholder="在这里写 Markdown ..."
          @input="renderMarkdown"
        ></textarea>
      </div>

      <!-- 右侧预览区 -->
      <div class="preview">
        <div v-html="renderedHtml" class="preview-content"></div>
      </div>
    </div>
  </div>
    </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import AppLayout from '../dashboard/AppLayout.vue';

</script>
<style scoped lang="less">
</style>