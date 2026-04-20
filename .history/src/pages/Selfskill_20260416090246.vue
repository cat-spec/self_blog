<template>
  <div>
    <AppLayout>
      <div ref="chartDom" class="w-full h-[400px]"></div>

      <div class="">
        <h2><i class="fas fa-code-branch"></i> 技术栈 · 熟练度</h2>

        <div class="skill-category">
          <h3>🚀 前端核心</h3>
          <div class="skill-item">
            <span>JS/TS</span>
            <div class="bar"><div style="width: 80%"></div></div>
            <span>80%</span>
          </div>
          <div class="skill-item">
            <span>vue3/vue2/pinia</span>
            <div class="bar"><div style="width: 70%"></div></div>
            <span>70%</span>
          </div>
          <div class="skill-item">
            <span>TailwindCSS</span>
            <div class="bar"><div style="width: 50%"></div></div>
            <span>50%</span>
          </div>
        </div>
        <div class="skill-category">
          <h3>⚙️ 后端 & 数据库</h3>
          <div class="skill-item">
            <span>Node.js / Express</span>
            <div class="bar"><div style="width: 75%"></div></div>
            <span>75%</span>
          </div>
          <div class="skill-item">
            <span>Python / FastAPI</span>
            <div class="bar"><div style="width: 60%"></div></div>
            <span>60%</span>
          </div>
          <div class="skill-item">
            <span>MySQL / PostgreSQL</span>
            <div class="bar"><div style="width: 65%"></div></div>
            <span>65%</span>
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
import AppLayout from "../components/dashboard/AppLayout.vue";

import * as echarts from "echarts";

var chartDom = ref(null);

var option;

// Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
const dataBJ = [[80, 30, 56, 20, 25, 10]];
const lineStyle = {
  width: 1,
  opacity: 1,
};
option = {
  backgroundColor: "#161627",
  title: {
    text: "开发类技能雷达图",
    left: "center",
    textStyle: {
      color: "#eee",
    },
  },

  radar: {
    indicator: [
      { name: "前端", max: 100 },
      { name: "后端", max: 100 },
      { name: "数据库", max: 100 },
      { name: "部署/容器/DevOps", max: 100 },
      { name: "工程化/代码质量", max: 100 },
      { name: "Python", max: 100 },
    ],
    shape: "circle",
    splitNumber: 5,
    axisName: {
      color: "rgb(238, 197, 102)",
    },
    splitLine: {
      lineStyle: {
        color: [
          "rgba(238, 197, 102, 0.1)",
          "rgba(238, 197, 102, 0.2)",
          "rgba(238, 197, 102, 0.4)",
          "rgba(238, 197, 102, 0.6)",
          "rgba(238, 197, 102, 0.8)",
          "rgba(238, 197, 102, 1)",
        ].reverse(),
      },
    },
    splitArea: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "rgba(238, 197, 102, 0.5)",
      },
    },
  },
  series: [
    {
      name: "Beijing",
      type: "radar",
      lineStyle: lineStyle,
      data: dataBJ,
      symbol: "none",
      itemStyle: {
        color: "#F9713C",
      },
      areaStyle: {
        opacity: 0.1,
      },
    },
  ],
};

onMounted(() => {
  console.log(chartDom);
  var myChart = echarts.init(chartDom.value);
  option && myChart.setOption(option);
});
</script>
<style scoped>
.skills-section {
  background: rgba(18, 25, 45, 0.7);
  border-radius: 2rem;
  padding: 2rem;
  margin: 2rem 0;
}
.skill-category {
  margin-bottom: 2rem;
}
.skill-category h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #a5f3ff;
}
.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}
.skill-item span:first-child {
  width: 160px;
  font-weight: 500;
}
.bar {
  flex: 1;
  background: #1e2a3a;
  border-radius: 20px;
  height: 10px;
  overflow: hidden;
}
.bar div {
  height: 100%;
  background: linear-gradient(90deg, #60a5fa, #c084fc);
  border-radius: 20px;
  width: 0%;
}
.skill-item span:last-child {
  width: 45px;
  text-align: right;
  font-family: monospace;
}
@media (max-width: 600px) {
  .skill-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .skill-item span:first-child {
    width: auto;
  }
  .bar {
    width: 100%;
  }
}
</style>
