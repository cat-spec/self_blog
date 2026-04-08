<template>
  <GlassCard>
    <div class="flex items-start justify-between gap-4">
      <div>
        <div class="text-[var(--text-h)] font-semibold flex items-center gap-3">
          <span class="inline-flex w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          GitHub 热力图
        </div>
        <div class="mt-2 text-xs opacity-70">
          <a href="https://github.com/cat-spec"></a>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs opacity-80">年份</span>
        <select
          v-model="year"
          class="h-9 px-3 rounded-lg bg-black/20 border border-[var(--border)]/80 hover:border-[var(--accent)]/40 text-sm"
        >
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>

    <div class="mt-5 flex gap-6">
      <div ref="mainChart" class="flex-1">
        <div
          class="grid gap-[2px] items-start"
          :style="{ gridTemplateColumns: `repeat(${heatmap.weeks}, 11px)` }"
        >
          <div
            v-for="cell in heatmap.cells"
            :key="cell.key"
            class="w-[11px] h-[11px] rounded-[2px] border border-black/10"
            :style="{ backgroundColor: cell.backgroundColor, opacity: cell.opacity }"
            :title="cell.tooltip"
            aria-label="github contribution heatmap cell"
          />
        </div>
      </div>

      <div class="w-[180px] shrink-0">
        <div class="text-xs opacity-80 mb-3">统计</div>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs opacity-70">贡献总数</span>
            <span class="text-sm font-mono text-[var(--accent)]">{{ heatmap.stats.total }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs opacity-70">活跃天数</span>
            <span class="text-sm font-mono text-[var(--accent)]">{{ heatmap.stats.activeDays }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs opacity-70">最长连续</span>
            <span class="text-sm font-mono text-[var(--accent)]">{{ heatmap.stats.longestStreak }}</span>
          </div>
        </div>

        <div class="mt-5">
          <div class="text-xs opacity-70 mb-2">图例</div>
          <div class="flex items-center gap-2 text-xs opacity-80">
            <span class="inline-flex w-3 h-3 rounded-[2px]" style="background:rgba(0, 255, 153, 0.28)" />
            <span>低</span>
            <span class="inline-flex w-3 h-3 rounded-[2px]" style="background:rgba(0, 255, 153, 0.55)" />
            <span>中</span>
            <span class="inline-flex w-3 h-3 rounded-[2px]" style="background:rgba(0, 255, 153, 0.9)" />
            <span>高</span>
          </div>
        </div>
      </div>
    </div>
  </GlassCard>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import GlassCard from './GlassCard.vue'

import * as echarts from 'echarts'
const mainChart = ref(null)
var option = {}

// 后期接口获取数据，这里先模拟数据
// const dailyData = {
//   // 示例：2026年1月1日 步数 8500，1月2日 无活动，1月3日 1200
//   "2026-03-13": 8500,
//   "2026-03-16": 0,
//   "2026-03-27": 1200,
// };

let dailyData = [
  ['2026-01-01', 8500],   // 有数据 → 绿色
  ['2026-01-02', 0],      // 无数据 → 灰色
  ['2026-01-03', 1200]    // 有数据 → 浅绿
]


// ========== 2. 将自定义数据转换为 ECharts 所需格式 ==========
function convertCustomDataToSeries(startDate, endDate, customMap) {
  const start = +echarts.time.parse(startDate);
  const end = +echarts.time.parse(endDate);
  const dayTime = 3600 * 24 * 1000;
  const result = [];
  for (let time = start; time <= end; time += dayTime) {
    const dateStr = echarts.time.format(time, '{yyyy}-{MM}-{dd}', false);
    const value = customMap[dateStr] !== undefined ? customMap[dateStr] : 0;
    result.push([dateStr, value]);
  }
  return result;
}

option = {
  // 隐藏标题，保持简洁
  title: { show: false },
  
  // 提示框显示日期和步数
  tooltip: {
    formatter: function(params) {
      return params.value[0];  // 只返回日期字符串
    }
  },
  
  // 连续型视觉映射，实现从浅绿到深绿的渐变，两端显示 Less / More
  visualMap: {
    min: 0,
    max: 10000,
    type: 'continuous',
    orient: 'horizontal',
    left: 'left',
    bottom: 20,
    text: ['Less', 'More'],
    textStyle: {
      color: '#586069',
      fontSize: 11
    },
    inRange: {
      color: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
    },
    calculable: false,
    itemWidth: 30,
    itemHeight: 12,
    align: 'left'
  },
  
  // 日历坐标系配置
  calendar: {
    top: 40,
    left: 50,
    right: 30,
    cellSize: [13, 13],           // 固定格子宽高，模拟 GitHub 风格
    range: ['2026-01-01', '2026-12-31'],  // 从1月到12月，与图片月份范围一致
    itemStyle: {
      borderWidth: 1,
      borderColor: '#ffffff',      // 白色边框产生间隔感
      borderRadius: 2              // 轻微圆角更接近原风格
    },
    yearLabel: { show: false },    // 不显示年份标签
    monthLabel: {
      show: true,
      nameMap: 'en',               // 英文缩写
      fontSize: 11,
      color: '#586069',
      margin: 8,
      position: 'top'              // 月份显示在格子顶部
    },
    dayLabel: {
      show: true,
      firstDay: 1,                 // 周一作为一周开始
      position: 'left',
      margin: 5,
      fontSize: 11,
      color: '#586069',
      formatter: function(params) {
        // 只显示周一、周三、周五的标签
        const day = params.date.getDay();
        if (day === 1) return 'Mon';
        if (day === 3) return 'Wed';
        if (day === 5) return 'Fri';
        return '';
      }
    }
  },
  
  // 热力图系列
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: convertCustomDataToSeries('2026-01-01', '2026-12-31', dailyData),
    itemStyle: {
      borderRadius: 2,
      borderWidth: 0
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 5,
        shadowColor: 'rgba(0,0,0,0.2)'
      }
    }
  },
  
  // 添加底部说明文字 (Learn how we count contributions)
  
  
  // 全局背景色和字体设置
  backgroundColor: 'rgb(0 0 0 / 0.2)',
  textStyle: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
  }
};
onMounted(() => {
  const eacharts=echarts.init(mainChart.value)
  option && eacharts.setOption(option);
}) 


const currentYear = new Date().getFullYear()
const years = [currentYear - 2, currentYear - 1, currentYear]

const year = ref(years[years.length - 1])

const MS_DAY = 24 * 60 * 60 * 1000

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function hashToLevel(seed) {
  // 0..3，稳定可复现（替换为真实贡献值时无需改 UI）
  const x = Math.sin(seed) * 10000
  const frac = x - Math.floor(x)
  return Math.floor(frac * 4)
}

function levelToColor(level) {
  if (level <= 0) return { backgroundColor: 'rgba(46,48,58,0.25)', opacity: 0.35 }
  // 主题色（荧光绿）分级：通过 alpha 控制层级
  if (level === 1) return { backgroundColor: 'rgba(0, 255, 153, 0.28)', opacity: 1 }
  if (level === 2) return { backgroundColor: 'rgba(0, 255, 153, 0.55)', opacity: 1 }
  return { backgroundColor: 'rgba(0, 255, 153, 0.9)', opacity: 1 }
}

function formatYMD(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const heatmap = computed(() => {
  const start = new Date(year.value, 0, 1)
  const end = new Date(year.value, 11, 31)

  // 以周一为列的起点（让视觉更像 GitHub）
  const startDay = (start.getDay() + 6) % 7 // Mon=0..Sun=6
  const gridStart = addDays(start, -startDay)

  const endDay = (end.getDay() + 6) % 7
  const gridEnd = addDays(end, 6 - endDay)

  const totalDays = Math.round((gridEnd - gridStart) / MS_DAY) + 1
  const weeks = Math.ceil(totalDays / 7)

  const cells = []
  const activeLevels = []

  for (let w = 0; w < weeks; w++) {
    for (let dow = 0; dow < 7; dow++) {
      const d = addDays(gridStart, w * 7 + dow)
      const inYear = d.getFullYear() === year.value
      let level = 0

      if (inYear) {
        const seed = year.value * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
        level = hashToLevel(seed)
        activeLevels.push(level > 0 ? 1 : 0)
      }

      if (!inYear) {
        cells.push({
          key: `${w}-${dow}-${formatYMD(d)}`,
          tooltip: `${formatYMD(d)} （非本年）`,
          backgroundColor: 'rgba(46,48,58,0.08)',
          opacity: 0.15,
        })
        continue
      }

      const color = levelToColor(level)
      cells.push({
        key: `${w}-${dow}-${formatYMD(d)}`,
        tooltip: `${formatYMD(d)} · 活跃度 ${level}`,
        backgroundColor: color.backgroundColor,
        opacity: color.opacity,
      })
    }
  }

  // 统计：贡献总和（把 1..3 直接当作“权重”），以及连续活跃天数
  let total = 0
  let longestStreak = 0
  let cur = 0

  // activeLevels 记录的是 year 内天（只有 inYear 才 push），因此可直接做连续统计
  activeLevels.forEach((isActive) => {
    if (isActive) {
      cur += 1
      longestStreak = Math.max(longestStreak, cur)
      return
    }
    cur = 0
  })

  // 再算 total：对 year 内每一天重新生成一次 level（避免把 inYear 与 grid 逻辑混在一起）
  const yearStart = new Date(year.value, 0, 1)
  const yearEnd = new Date(year.value, 11, 31)
  const daysInYear = Math.round((yearEnd - yearStart) / MS_DAY) + 1
  for (let i = 0; i < daysInYear; i++) {
    const d = addDays(yearStart, i)
    const seed = year.value * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
    total += hashToLevel(seed)
  }

  const activeDays = Math.floor(total / 1.5) // 近似展示：避免重复扫描 level -> active

  return {
    weeks,
    cells,
    stats: {
      total,
      activeDays,
      longestStreak,
    },
  }
})
</script>

