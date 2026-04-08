<template>
  <AppLayout>
    <div class="garden-detail">
      <div class="markdown-blog">
        <!-- 左侧大纲 -->
        <aside class="toc" :class="{ 'toc-collapsed': isTocCollapsed }">
          <div class="toc-header">
            <h3>目录</h3>
            <button class="toggle-btn" type="button" @click="isTocCollapsed = !isTocCollapsed">
              {{ isTocCollapsed ? '☰' : '✕' }}
            </button>
          </div>

          <nav v-if="!isTocCollapsed" aria-label="文章目录">
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

            <div v-if="toc.length === 0" class="toc-empty">未找到标题</div>
          </nav>
        </aside>

        <!-- 右侧内容 -->
        <main class="content" ref="contentRef">
          <div class="markdown-body" v-html="renderedHtml"></div>
        </main>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import AppLayout from '../dashboard/AppLayout.vue'

type TocItem = { id: string; text: string; level: number }

const route = useRoute()
const contentRef = ref<HTMLElement | null>(null)

const renderedHtml = ref('')
const toc = ref<TocItem[]>([])
const activeId = ref('')
const isTocCollapsed = ref(false)

let observer: IntersectionObserver | null = null

function getQueryString(key: string): string {
  const v = route.query[key]
  if (typeof v === 'string') return v
  if (Array.isArray(v) && typeof v[0] === 'string') return v[0]
  return ''
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createIdGenerator() {
  const counts = new Map<string, number>()
  return (text: string) => {
    const base = slugify(text)
    const n = counts.get(base) ?? 0
    counts.set(base, n + 1)
    return n === 0 ? base : `${base}-${n}`
  }
}

async function renderMarkdown(md: string) {
  // 1) 先生成目录：根据 lexer 的 heading 顺序分配 id
  const tokens = marked.lexer(md)
  const genForToc = createIdGenerator()
  const headings: TocItem[] = []

  marked.walkTokens(tokens, (token) => {
    if (token.type === 'heading' && token.depth <= 4) {
      headings.push({
        id: genForToc(token.text),
        text: token.text,
        level: token.depth,
      })
    }
  })

  // 2) 再渲染内容：用同样的 id 分配策略（基于渲染过程中 heading 的顺序）
  const genForRender = createIdGenerator()
  const renderer = new marked.Renderer()
  renderer.heading = (text, level) => {
    const id = genForRender(String(text))
    return `<h${level} id="${id}">${text}</h${level}>`
  }

  // marked.use 会影响全局，所以渲染结束后尽量恢复
  const previousRenderer = new marked.Renderer()
  marked.use({ renderer })
  const rawHtml = marked.parse(md)
  marked.use({ renderer: previousRenderer })

  renderedHtml.value = DOMPurify.sanitize(rawHtml)
  toc.value = headings

  await nextTick()
  setupIntersectionObserver()
}

function setupIntersectionObserver() {
  observer?.disconnect()
  observer = null

  const rootEl = contentRef.value
  if (!rootEl) return

  const headingEls = Array.from(rootEl.querySelectorAll<HTMLElement>('h1, h2, h3, h4'))
  if (headingEls.length === 0) return

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting && e.target instanceof HTMLElement)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible[0]?.target instanceof HTMLElement) {
        const id = visible[0].target.id
        if (id) activeId.value = id
      }
    },
    // 调整触发区：让滚动到标题区域附近时就高亮
    { rootMargin: '-20px 0px -70% 0px', threshold: 0.01 }
  )

  headingEls.forEach((el) => observer?.observe(el))
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  activeId.value = id
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const sampleMarkdown = `# 知识花园

这是一个用于演示的 Markdown 内容。

## 左侧大纲
- 会根据标题自动生成
- 支持点击跳转

## 右侧内容
滚动时会自动高亮当前阅读到的章节。

### 三级标题

这里可以继续写内容，比如代码块：

\`\`\`ts
export function hello(name: string) {
  return \`Hello, \${name}\`
}
\`\`\`
`

async function loadFromRoute() {
  const url = getQueryString('url')
  const mdFromQuery = getQueryString('markdown') || getQueryString('content')
  const defaultUrl = '/githot/notes/tailwind'

  if (url) {
    const res = await fetch(url)
    const text = await res.text()
    await renderMarkdown(text)
    return
  }

  // query 里可能有很长的内容，需要你手动用 URL encode 后传入
  if (mdFromQuery) {
    await renderMarkdown(String(mdFromQuery))
    return
  }

  // 默认：读取固定的 Tailwind 笔记
  try {
    const res = await fetch(defaultUrl)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    await renderMarkdown(text)
  } catch {
    // 兜底：避免接口不可用时页面空白
    await renderMarkdown(sampleMarkdown)
  }
}

watch(
  () => [getQueryString('url'), getQueryString('markdown'), getQueryString('content')].join('|'),
  () => {
    void loadFromRoute()
  },
  { immediate: true }
)

onMounted(() => {
  // mounted 后由 watch(immediate) 拉起首次渲染
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
.garden-detail {
  width: 100%;
}

.markdown-blog {
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0; /* AppLayout main 已经提供了 padding */
}

/* 左侧目录 */
.toc {
  position: sticky;
  top: 1rem;
  width: 280px;
  flex-shrink: 0;
  border-radius: 12px;
  padding: 1rem;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid var(--border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  height: fit-content;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  transition: width 0.2s ease;
}

.toc-collapsed {
  width: 64px;
  padding: 1rem 0.5rem;
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.toc-header h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--text-h);
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text);
  padding: 0 4px;
}

.toc-empty {
  color: var(--text);
  opacity: 0.7;
  font-size: 0.9rem;
  padding: 0.5rem 0.25rem;
}

.toc nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin: 0.5rem 0;
  line-height: 1.35;
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
  font-size: 0.92rem;
}

.toc-item.level-4 {
  margin-left: 2.5rem;
  font-size: 0.86rem;
}

.toc-item a {
  text-decoration: none;
  color: var(--text);
  display: inline-block;
  padding: 0.2rem 0;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
  transition: all 0.15s ease;
}

.toc-item a:hover {
  color: var(--accent);
  border-left-color: var(--accent);
}

.toc-item.active a {
  color: var(--accent);
  font-weight: 600;
  border-left-color: var(--accent);
  background: var(--accent-bg);
  border-radius: 8px 0 0 8px;
}

/* 右侧内容区域 */
.content {
  flex: 1;
  min-width: 0;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
}

.markdown-body {
  padding: 1.75rem 2rem;
  line-height: 1.75;
  color: var(--text-h);
}

.markdown-body :deep(h1) {
  font-size: 2.2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.3em;
  border-bottom: 1px solid var(--border);
  scroll-margin-top: 90px;
}

.markdown-body :deep(h2) {
  font-size: 1.55rem;
  margin-top: 1.6rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.15em;
  border-bottom: 1px solid var(--border);
  scroll-margin-top: 90px;
}

.markdown-body :deep(h3) {
  font-size: 1.25rem;
  margin-top: 1.25rem;
  scroll-margin-top: 90px;
}

.markdown-body :deep(p) {
  margin-bottom: 1rem;
}

.markdown-body :deep(code) {
  background: rgba(0, 0, 0, 0.04);
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-family: var(--mono);
  font-size: 0.9em;
  color: var(--text-h);
}

.markdown-body :deep(pre) {
  background: rgba(0, 0, 0, 0.04);
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
  border-left: 4px solid var(--border);
  color: var(--text);
  opacity: 0.9;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 2em;
  margin: 0 0 1rem 0;
}

.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  text-align: left;
}

@media (max-width: 1024px) {
  .markdown-blog {
    flex-direction: column;
    gap: 1rem;
  }

  .toc {
    position: relative;
    top: 0;
    width: 100%;
    max-height: 280px;
  }
}
</style>