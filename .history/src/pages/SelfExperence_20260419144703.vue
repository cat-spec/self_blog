<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="title-section">
        <h1 style="height: 50px;line-height: 50px;">
          <i class="fas fa-chalkboard-user" ></i> 个人经历
        </h1>
        <p>
          <i class="fas fa-timeline"></i> 垂直时间轴 · 记录每一个重要阶段
          <span class="badge">{{ timelineItems.length }}</span> 项经历
        </p>
      </div>
    </header>

    <Timeline :items="timelineItems" />

    <footer class="dashboard-footer">
      <i class="fas fa-mug-hot"></i> 纯粹展示 · 个人成长时光轴
    </footer>
  </div>
</template>

<script setup>
import Timeline from '../components/self/Timeline.vue'

// 静态经历数据（无任何修改接口）
const timelineItems = [
  {
    id: 'exp1',
    period: '2023 - 至今',
    title: '全栈开发工程师',
    subtitle: '星云科技 · 远程',
    description: '负责公司核心产品的前后端架构设计，使用 React + Node.js 构建高性能仪表盘，优化 API 响应速度 40%。带领 3 人小组完成两个季度迭代，推动技术文档标准化。',
    tags: ['React', 'Node.js', 'Tailwind', 'MongoDB']
  },
  {
    id: 'exp2',
    period: '2021 - 2023',
    title: 'UI/UX 设计师 & 前端',
    subtitle: '灵感设计工作室',
    description: '从 0 到 1 设计并实现多个企业官网和管理系统，推动设计系统落地，组件库复用率提升 65%。与产品团队紧密合作，提升用户体验与交互流畅度。',
    tags: ['Figma', 'Vue3', 'Pinia', 'SCSS']
  },
  {
    id: 'exp3',
    period: '2019 - 2021',
    title: '计算机科学与技术 硕士',
    subtitle: '清华大学 · 信息交互实验室',
    description: '研究方向为人机交互与数据可视化，发表一篇 CHI 论文。参与国家自然科学基金项目，开发实验数据平台，帮助研究人员高效采集与分析数据。',
    tags: ['Python', '数据分析', 'D3.js', '科研']
  },
  {
    id: 'exp4',
    period: '2015 - 2019',
    title: '软件工程 本科',
    subtitle: '浙江大学 · 竺可桢学院',
    description: '主修课程：数据结构、Web开发、数据库。获得校优秀毕业生，设计校园二手交易平台获得最佳项目奖。积极参与开源社区与编程竞赛。',
    tags: ['Java', 'JavaScript', 'MySQL', 'SSM']
  }
]
</script>

<style scoped>
.dashboard {
  max-width: 1280px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
  border-radius: 2.5rem;
  box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem 1.8rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  border-bottom: 2px solid rgba(100, 116, 139, 0.2);
  padding-bottom: 1.5rem;
}

.title-section h1 {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b, #3b82f6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: -0.3px;
}

.title-section p {
  color: #475569;
  font-size: 0.9rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: #3b82f6;
  color: white;
  border-radius: 40px;
  padding: 0.2rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 6px;
}

.dashboard-footer {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.75rem;
  color: #5b6e8c;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 1.5rem;
}
</style>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(145deg, #f0f4fa 0%, #e6ecf3 100%);
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  padding: 2rem 1.5rem;
  min-height: 100vh;
}

@media (max-width: 760px) {
  body {
    padding: 1rem;
  }
  .dashboard {
    padding: 1.2rem;
  }
}
</style>