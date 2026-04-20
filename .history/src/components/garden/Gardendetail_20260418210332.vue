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
/* 整体布局 */
.markdown-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.upload-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
}

.file-btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
  font-weight: 500;
}
.file-btn:hover {
  background-color: #1e2a36;
}
.clear-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}
.clear-btn:hover {
  background-color: #c0392b;
}

.loading, .error, .placeholder {
  text-align: center;
  padding: 60px;
  background: #f8f9fa;
  border-radius: 12px;
  color: #6c757d;
}
.error {
  color: #e74c3c;
  background: #fef2f2;
}
.placeholder {
  background: #fef9e6;
  color: #b88a00;
}

/* 两栏布局（桌面） */
.content-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

/* 侧边栏目录 */
.toc-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px 0 16px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.toc-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}
.toc-nav ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
.toc-nav li {
  margin: 8px 0;
  line-height: 1.4;
}
.toc-level-1 { margin-left: 0; font-weight: 600; }
.toc-level-2 { margin-left: 16px; }
.toc-level-3 { margin-left: 32px; font-size: 0.9rem; }
.toc-level-4,
.toc-level-5,
.toc-level-6 { margin-left: 48px; font-size: 0.85rem; }

.toc-nav a {
  text-decoration: none;
  color: #2c3e50;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s;
}
.toc-nav a:hover {
  background-color: #e9ecef;
  color: #0066cc;
}
.no-toc {
  color: #adb5bd;
  font-size: 0.9rem;
  padding: 8px 0;
}

/* Markdown 正文样式（类似 GitHub） */
.markdown-body {
  flex: 1;
  background: white;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow-x: auto;
  line-height: 1.6;
  color: #1f2d3d;
}

/* 标题样式 */
.markdown-body h1 {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.markdown-body h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 1em;
}
.markdown-body h3 { font-size: 1.25em; margin-top: 1em; }
.markdown-body h4 { font-size: 1em; margin-top: 1em; }
.markdown-body h5, .markdown-body h6 { font-size: 0.875em; }

/* 段落、列表、引用 */
.markdown-body p { margin: 0.8em 0; }
.markdown-body ul, .markdown-body ol { padding-left: 2em; margin: 0.8em 0; }
.markdown-body blockquote {
  margin: 0.8em 0;
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
.markdown-body code {
  background: #f6f8fa;
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-family: 'SF Mono', 'Menlo', monospace;
  font-size: 85%;
}
.markdown-body pre {
  background: #282c34;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}
.markdown-body pre code {
  background: transparent;
  padding: 0;
  color: #abb2bf;
}
.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}
.markdown-body th, .markdown-body td {
  border: 1px solid #dfe2e5;
  padding: 8px 12px;
}
.markdown-body th {
  background: #f6f8fa;
  font-weight: 600;
}
.markdown-body img {
  max-width: 100%;
  border-radius: 8px;
}

/* 响应式：移动端隐藏侧边栏或改为顶部 */
@media (max-width: 768px) {
  .content-layout {
    flex-direction: column;
  }
  .toc-sidebar {
    width: 100%;
    position: static;
    margin-bottom: 20px;
    max-height: 300px;
  }
  .markdown-body {
    padding: 20px;
  }
}
</style>