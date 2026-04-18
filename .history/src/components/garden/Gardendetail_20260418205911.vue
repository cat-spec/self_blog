<template>
  <div class="auto-markdown-container">
    <div v-if="loading" class="loading">加载文章中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content-layout">
      <!-- 侧边栏目录（粘性） -->
      <aside class="toc-sidebar sticky">
        <div class="toc-title">📑 目录</div>
        <nav class="toc-nav">
          <ul>
            <li v-for="item in toc" :key="item.id" :class="`toc-level-${item.level}`">
              <a href="javascript:void(0)" @click="scrollToHeading(item.id)">
                {{ item.text }}
              </a>
            </li>
          </ul>
          <div v-if="toc.length === 0" class="no-toc">无标题</div>
        </nav>
      </aside>

      <!-- 渲染的 Markdown 正文 -->
      <main class="markdown-body" v-html="renderedHtml"></main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
//路由传参数
import { useRoute } from 'vue-router'
const route = useRoute()
const filePath = route.query.path



const loading = ref(true)
const error = ref(null)
const renderedHtml = ref('')
const toc = ref([])

// 生成标题 id
function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// 自定义渲染器，提取目录
function createRendererWithToc() {
  const renderer = new marked.Renderer()
  const headings = []

  renderer.heading = function({ tokens, depth }) {
    const text = this.parser.parseInline(tokens)
    const id = slugify(text)
    headings.push({ id, text, level: depth })
    return `<h${depth} id="${id}">${text}</h${depth}>`
  }

  return { renderer, headings }
}

// 配置 marked
marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

// 加载并解析 md 文件
async function loadMarkdown() {
  console.log(filePath)
  if (!filePath) return
console.log(filePath)
  loading.value = true
  error.value = null
  renderedHtml.value = ''
  toc.value = []

  try {
    const response = await fetch(filePath)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const content = await response.text()

    const { renderer, headings } = createRendererWithToc()
    const html = await marked.parse(content, { renderer })
    renderedHtml.value = html
    toc.value = headings
  } catch (err) {
    console.error(err)
    error.value = `加载文件失败：${err.message}`
  } finally {
    loading.value = false
  }
}

// 点击目录滚动
function scrollToHeading(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 页面挂载时加载，如果 filePath 变化也重新加载
onMounted(() => {
  loadMarkdown()
})

</script>

<style>
.upload-markdown {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.upload-area {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.file-label {
  background-color: #2c3e50;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.file-label:hover {
  background-color: #1e2a36;
}
input[type="file"] {
  display: none;
}
.clear-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
.clear-btn:hover {
  background-color: #c0392b;
}

.loading, .error, .placeholder {
  text-align: center;
  padding: 40px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
}
.error {
  color: #e74c3c;
  background: #fef2f2;
}
.placeholder {
  color: #7f8c8d;
}
.file-info {
  margin: 20px 0 10px;
  padding: 8px;
  background: #ecf0f1;
  border-radius: 6px;
  font-size: 14px;
}
.preview-container {
  margin-top: 20px;
}
.markdown-body {
  line-height: 1.7;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>