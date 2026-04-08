<template>
  <div class="markdown-blog">
    <!-- 左侧大纲 -->
    <aside class="toc" :class="{ 'toc-collapsed': isTocCollapsed }">
      <div class="toc-header">
        <h3>📑 目录</h3>
        <button class="toggle-btn" @click="isTocCollapsed = !isTocCollapsed">
          {{ isTocCollapsed ? '☰' : '✕' }}
        </button>
      </div>
      <nav v-if="!isTocCollapsed">
        <ul>
          <li
            v-for="item in toc"
            :key="item.id"
            :class="['toc-item', `level-${item.level}`, { active: activeId === item.id }]"
          >
            <a :href="`#${item.id}`" @click.prevent="scrollToHeading(item.id)">
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- 右侧内容 -->
    <main class="content" ref="contentRef">
      <div class="markdown-body" v-html="renderedHtml"></div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// 可接收外部 markdown 文本
const props = defineProps({
  markdown: {
    type: String,
    default: `# 项目介绍

这是一个使用 **marked** + **Vue 3** 构建的个人博客示例。

## 功能特点

- 左侧自动生成文章大纲（目录）
- 点击目录平滑滚动到对应标题
- 滚动时自动高亮当前阅读章节
- 支持折叠/展开侧边栏

## 技术栈

- Vue 3 Composition API
- marked（Markdown 解析）
- DOMPurify（XSS 防护）
- 原生滚动 API

## 快速开始

\`\`\`bash
npm install marked dompurify
\`\`\`

## 自定义标题

### 三级标题示例

这是更深层的内容，大纲会保留层级缩进。

## 总结

大纲跳转功能极大提升了长文档的阅读体验。
`
  }
})

const contentRef = ref(null)
const renderedHtml = ref('')
const toc = ref([])          // 目录项 [{ id, text, level }]
const activeId = ref('')
const isTocCollapsed = ref(false)

// 从 markdown 解析并生成带 id 的 HTML 和目录
const parseMarkdown = async () => {
  // 1. 使用 marked.lexer 获取 token 树
  const tokens = marked.lexer(props.markdown)
  const headings = []
  
  // 2. 遍历 tokens，提取标题信息，并为每个标题生成唯一 id
  //    同时构建新的 token 树用于渲染（给标题标签添加 id）
  const walkTokens = (token) => {
    if (token.type === 'heading') {
      // 生成 id：去空格、转小写、去特殊字符
      const id = token.text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')
      headings.push({
        id,
        text: token.text,
        level: token.depth
      })
      // 给原 token 添加自定义属性，以便在渲染时生成带 id 的标签
      token.id = id
    }
  }
  marked.walkTokens(tokens, walkTokens)
  toc.value = headings

  // 3. 使用 marked.parser 将 token 树转为 HTML，但需要自定义渲染器使 heading 带上 id
  const renderer = new marked.Renderer()
  // 保存原始 heading 渲染方法
  const originalHeading = renderer.heading
  renderer.heading = function(text, level, raw, slugger) {
    // 从当前 token 上下文获取 id（我们之前注入的）
    // 注意：在 parser 阶段，raw 参数不可靠，我们改用全局记录
    // 简单方法：重新根据 text 生成 id（保持和上面一致）
    const id = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '')
    return `<h${level} id="${id}">${text}</h${level}>`
  }
  
  marked.use({ renderer })
  const rawHtml = await marked.parse(props.markdown)
  // 还原 renderer 避免影响其他实例（可选）
  marked.use({ renderer: new marked.Renderer() })
  
  // 4. XSS 过滤
  renderedHtml.value = DOMPurify.sanitize(rawHtml)
}

// 滚动到指定标题
const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = id
  }
}

// 监听右侧滚动，高亮当前可见标题
let observer = null
const setupIntersectionObserver = () => {
  if (observer) observer.disconnect()
  
  observer = new IntersectionObserver(
    (entries) => {
      // 找到所有可见的标题中，离视口顶部最近的那个
      const visibleHeadings = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      
      if (visibleHeadings.length > 0) {
        const activeHeadingId = visibleHeadings[0].target.id
        if (activeHeadingId) {
          activeId.value = activeHeadingId
        }
      }
    },
    { rootMargin: '-20px 0px -70% 0px', threshold: 0.5 } // 调整触发区域
  )
  
  // 观察所有标题元素
  const headings = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4')
  headings.forEach(heading => observer.observe(heading))
}

// 当右侧内容更新后，重新绑定观察器
watch(renderedHtml, async () => {
  await new Promise(resolve => setTimeout(resolve, 50)) // 等待 DOM 更新
  setupIntersectionObserver()
})

// 初始解析
onMounted(async () => {
  await parseMarkdown()
})

// 清理观察器
onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.markdown-blog {
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* 左侧目录 */
.toc {
  position: sticky;
  top: 2rem;
  width: 280px;
  flex-shrink: 0;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  transition: all 0.2s ease;
}

.toc-collapsed {
  width: 60px;
  padding: 1rem 0.5rem;
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.toc-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0 4px;
}

.toc nav ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.toc-item {
  margin: 0.5rem 0;
  line-height: 1.4;
}

.toc-item.level-1 {
  font-weight: 600;
  margin-left: 0;
}
.toc-item.level-2 {
  margin-left: 1rem;
}
.toc-item.level-3 {
  margin-left: 2rem;
  font-size: 0.9rem;
}
.toc-item.level-4 {
  margin-left: 2.5rem;
  font-size: 0.85rem;
}

.toc-item a {
  text-decoration: none;
  color: #495057;
  display: inline-block;
  padding: 0.2rem 0;
  transition: all 0.2s;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
}

.toc-item a:hover {
  color: #0366d6;
  border-left-color: #0366d6;
}

.toc-item.active a {
  color: #0366d6;
  font-weight: 500;
  border-left-color: #0366d6;
  background: #e7f3ff;
  border-radius: 0 4px 4px 0;
}

/* 右侧内容区域 */
.content {
  flex: 1;
  min-width: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  overflow-x: auto;
}

.markdown-body {
  padding: 2rem;
  line-height: 1.7;
  color: #24292e;
}

/* 右侧 Markdown 样式 */
.markdown-body :deep(h1) {
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  scroll-margin-top: 2rem; /* 滚动偏移，防止标题被固定元素遮挡 */
}

.markdown-body :deep(h2) {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid #eaecef;
  scroll-margin-top: 2rem;
}

.markdown-body :deep(h3) {
  font-size: 1.25rem;
  margin-top: 1.25rem;
  scroll-margin-top: 2rem;
}

.markdown-body :deep(p) {
  margin-bottom: 1rem;
}

.markdown-body :deep(code) {
  background: #f6f8fa;
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.85em;
}

.markdown-body :deep(pre) {
  background: #f6f8fa;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-body :deep(blockquote) {
  margin: 0;
  padding-left: 1em;
  border-left: 4px solid #dfe2e5;
  color: #6a737d;
}

.markdown-body :deep(ul), .markdown-body :deep(ol) {
  padding-left: 2em;
}

.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

.markdown-body :deep(th), .markdown-body :deep(td) {
  border: 1px solid #dfe2e5;
  padding: 0.5rem 1rem;
  text-align: left;
}

@media (max-width: 768px) {
  .markdown-blog {
    flex-direction: column;
    padding: 1rem;
  }
  .toc {
    position: relative;
    width: 100%;
    max-height: 300px;
    top: 0;
  }
}
</style>