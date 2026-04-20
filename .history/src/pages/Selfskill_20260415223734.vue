<template>
  <div>
    <AppLayout>
      <div ref="charDom" class="radar">

      </div>
    </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import AppLayout from '../components/dashboard/AppLayout.vue'

import * as echarts from 'echarts';

var chartDom = ref(null);

var option;

// Schema:
// date,AQIindex,PM2.5,PM10,CO,NO2,SO2
const dataBJ = [[80, 30, 56, 20, 25, 10]];
const lineStyle = {
  width: 1,
  opacity: 1
};
option = {
  backgroundColor: '#161627',
  title: {
    text: '各项技能雷达图',
    left: 'center',
    textStyle: {
      color: '#eee'
    }
  },

  radar: {
    indicator: [
      { name: '前端', max: 100 },
      { name: '后端', max: 100 },
      { name: '数据库', max: 100 },
      { name: '部署/容器/DevOps', max: 100 },
      { name: '工程化/代码质量', max: 100 },
      { name: 'Python', max: 100 }
    ],
    shape: 'circle',
    splitNumber: 5,
    axisName: {
      color: 'rgb(238, 197, 102)'
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(238, 197, 102, 0.1)',
          'rgba(238, 197, 102, 0.2)',
          'rgba(238, 197, 102, 0.4)',
          'rgba(238, 197, 102, 0.6)',
          'rgba(238, 197, 102, 0.8)',
          'rgba(238, 197, 102, 1)'
        ].reverse()
      }
    },
    splitArea: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(238, 197, 102, 0.5)'
      }
    }
  },
  series: [
    {
      name: 'Beijing',
      type: 'radar',
      lineStyle: lineStyle,
      data: dataBJ,
      symbol: 'none',
      itemStyle: {
        color: '#F9713C'
      },
      areaStyle: {
        opacity: 0.1
      }
    }
  ]
};

onMounted(() => {
    console.log(chartDom.value);
    var myChart = echarts.init(chartDom.value);
    option && myChart.setOption(option);
})







</script>
<style scoped lang="less">
</style>