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
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

// 默认示例内容
const source = ref(`# 你好，世界！

这是一段 **Markdown** 示例文本。

- 列表项 1
- 列表项 2

\`\`\`javascript
// 代码块
console.log("Hello, marked!");
\`\`\`

> 引用块

[点击访问 marked 官网](https://marked.js.org/)
`)

const renderedHtml = ref('')

// 渲染函数
const renderMarkdown = async () => {
  try {
    // 使用 marked.parse 异步解析 Markdown
    const html = await marked.parse(source.value)
    renderedHtml.value = html
  } catch (error) {
    console.error('Markdown 解析失败:', error)
    renderedHtml.value = '<p style="color: red;">解析错误，请检查语法</p>'
  }
}

// 组件挂载后立即渲染一次
onMounted(() => {
  renderMarkdown()
})

</script>
<style scoped lang="less">
</style>