<template>
  <div class="markdown-container">
    <!-- 上传区域 -->
    <div class="upload-bar">
      <label for="md-file" class="file-btn">📂 选择 Markdown 文件</label>
      <input
        id="md-file"
        type="file"
        accept=".md,.markdown,text/markdown"
        @change="handleFileUpload"
        style="display: none"
      />
      <button v-if="fileContent" class="clear-btn" @click="clearFile">
        清除
      </button>
    </div>

    <div v-if="loading" class="loading">解析中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="fileContent" class="content-layout" style="display: flex;justify-content: space-between;">
      <!-- 侧边栏目录 - 粘性布局 -->
      <aside class="toc-sidebar" style="position: fixed;top: 0px;">
        <div class="toc-title">📑 目录</div>
        <nav class="toc-nav">
          <ul>
            <li
              v-for="item in toc"
              :key="item.id"
              :class="`toc-level-${item.level}`"
            >
              <a href="javascript:void(0)" @click="scrollToHeading(item.id)">
                {{ item.text }}
              </a>
            </li>
          </ul>
          <div v-if="toc.length === 0" class="no-toc">无标题</div>
        </nav>
      </aside>

      <!-- 渲染的 Markdown 内容 -->
      <main class="markdown-body ml-[300px]" v-html="renderedHtml"></main>
    </div>

    <div v-else class="placeholder">
      请选择一个 .md 或 .markdown 文件进行预览
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const path = route.query.path
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { on } from "../../../backend/config/mysql";

const loading = ref(false);
const error = ref(null);
const fileContent = ref(null);
const renderedHtml = ref("");
const toc = ref([]);

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createRendererWithToc() {
  const renderer = new marked.Renderer();
  const headings = [];

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const id = slugify(text);
    headings.push({ id, text, level: depth });
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  return { renderer, headings };
}

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

async function parseMarkdown(content) {
  const { renderer, headings } = createRendererWithToc();
  const html = await marked.parse(content, { renderer });
  console.log(html);
  return { html, toc: headings };
}
onMounted(() => {
  console.log(path);
 handleFileUpload()
})



const handleFileUpload = async (event) => {
  const file=new File([path], path.split('/').pop(), { type: 'text/markdown' })
  // const file = event.target.files[0];
  if (!file) return;

  if (!file.name.match(/\.(md|markdown)$/i)) {
    error.value = "请选择 .md 或 .markdown 格式的文件";
    return;
  }

  loading.value = true;
  error.value = null;
  fileContent.value = null;
  toc.value = [];
  renderedHtml.value = "";

  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target.result;
    fileContent.value = content;
    try {
      const { html, toc: headings } = await parseMarkdown(content);
      renderedHtml.value = html;
      toc.value = headings;
    } catch (err) {
      error.value = "Markdown 解析失败：" + err.message;
    } finally {
      loading.value = false;
    }
  };
  reader.onerror = () => {
    error.value = "文件读取失败，请重试";
    loading.value = false;
  };
  reader.readAsText(file, "UTF-8");
};

const clearFile = () => {
  fileContent.value = null;
  renderedHtml.value = "";
  toc.value = [];
  error.value = null;
  const fileInput = document.getElementById("md-file");
  if (fileInput) fileInput.value = "";
};

const scrollToHeading = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<style scoped>




.content-layout {
  display: flex;
  align-items: flex-start;  /* 关键：防止拉伸导致 sticky 失效 */
  gap: 30px;
}

.toc-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;               /* 距离视口顶部 20px */
  align-self: flex-start;  /* 确保在 flex 容器中 sticky 生效 */
  max-height: calc(100vh - 40px); /* 限制最大高度，超出滚动 */
  overflow-y: auto;
}



/* 整体容器 */
.markdown-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* 上传栏 */
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

/* 状态提示 */
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

/* 两栏布局 */
.content-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

/* 目录侧边栏 - 粘性布局 */
.toc-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px 0 16px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
/* 关键：粘性定位 */
.sticky {
  position: sticky;
  top: 20px;      /* 距离视口顶部20px时固定 */
  align-self: flex-start; /* 确保在 flex 容器中生效 */
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

/* Markdown 正文样式 - 确保所有标题都有明显样式 */
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

/* 标题样式 - 明确覆盖 */
.markdown-body h1 {
  font-size: 2em;
  font-weight: 600;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: #111;
}
.markdown-body h2 {
  font-size: 1.5em;
  font-weight: 600;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: #111;
}
.markdown-body h3 {
  font-size: 1.25em;
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: #111;
}
.markdown-body h4 {
  font-size: 1em;
  font-weight: 600;
  margin-top: 1em;
  color: #111;
}
.markdown-body h5, .markdown-body h6 {
  font-size: 0.875em;
  font-weight: 600;
  margin-top: 1em;
  color: #111;
}

/* 其他元素样式 */
.markdown-body p {
  margin: 0.8em 0;
}
.markdown-body ul, .markdown-body ol {
  padding-left: 2em;
  margin: 0.8em 0;
}
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

/* 响应式 */
@media (max-width: 768px) {
  .content-layout {
    flex-direction: column;
  }
  .toc-sidebar {
    width: 100%;
    position: static; /* 移动端取消粘性 */
    max-height: 300px;
    margin-bottom: 20px;
  }
  .markdown-body {
    padding: 20px;
  }
}
</style>
