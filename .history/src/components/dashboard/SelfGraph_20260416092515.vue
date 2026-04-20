<template>
  <div>
     <div class="w-full h-[400px] graph-card">
        <div class="card-header">
            <i class="fas fa-cubes"></i> 
            <span>全栈技术生态 · 按熟练度分级</span>
            <span style="font-size:0.7rem; margin-left:auto;">拖拽节点 | 滚轮缩放</span>
        </div>
        <div ref="chartDom" id="mastery-graph" class="chart-container"></div>
        <div class="legend-panel">
            <div class="legend-colors">
                <span class="legend-item"><i class="dot high"></i> 高熟练度 (核心主力)</span>
                <span class="legend-item"><i class="dot medium"></i> 中熟练度 (常用/熟悉)</span>
                <span class="legend-item"><i class="dot low"></i> 低熟练度 (了解/学习中)</span>
            </div>
            <div class="interact-tip">
                <i class="fas fa-mouse-pointer"></i> 悬停看详情 · 力导向自动布局
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import * as echarts from 'echarts';

const skillsData = {
        // 节点列表
        nodes: [
            { name: "JavaScript", mastery: "high" },
            { name: "TypeScript", mastery: "high" },
            { name: "React", mastery: "high" },
            { name: "Vue", mastery: "medium" },
            { name: "Node.js", mastery: "high" },
            { name: "Python", mastery: "medium" },
            { name: "Express", mastery: "high" },
            { name: "Spring Boot", mastery: "low" },
            { name: "MySQL", mastery: "medium" },
            { name: "PostgreSQL", mastery: "medium" },
            { name: "MongoDB", mastery: "low" },
            { name: "Redis", mastery: "medium" },
            { name: "Docker", mastery: "medium" },
            { name: "Git", mastery: "high" },
            { name: "Webpack", mastery: "medium" },
            { name: "Vite", mastery: "high" },
            { name: "Next.js", mastery: "medium" },
            { name: "TailwindCSS", mastery: "high" },
            { name: "HTML5/CSS3", mastery: "high" },
            { name: "GraphQL", mastery: "low" },
            { name: "Kubernetes", mastery: "low" }
        ],
        // 关系连线 (依赖/关联)
        links: [
            { source: "JavaScript", target: "React" },
            { source: "JavaScript", target: "Vue" },
            { source: "JavaScript", target: "Node.js" },
            { source: "TypeScript", target: "React" },
            { source: "TypeScript", target: "Next.js" },
            { source: "React", target: "Next.js" },
            { source: "React", target: "TailwindCSS" },
            { source: "React", target: "Webpack" },
            { source: "React", target: "Vite" },
            { source: "Vue", target: "Webpack" },
            { source: "Node.js", target: "Express" },
            { source: "Express", target: "MySQL" },
            { source: "Express", target: "Redis" },
            { source: "Express", target: "MongoDB" },
            { source: "Python", target: "Spring Boot" },  // 示意关联，实际可调整
            { source: "Spring Boot", target: "MySQL" },
            { source: "MySQL", target: "PostgreSQL" },
            { source: "Redis", target: "Node.js" },
            { source: "Docker", target: "Node.js" },
            { source: "Docker", target: "Express" },
            { source: "Docker", target: "MySQL" },
            { source: "Git", target: "JavaScript" },
            { source: "Git", target: "React" },
            { source: "Webpack", target: "React" },
            { source: "Vite", target: "React" },
            { source: "Next.js", target: "React" },
            { source: "HTML5/CSS3", target: "TailwindCSS" },
            { source: "GraphQL", target: "Node.js" },
            { source: "Kubernetes", target: "Docker" },
            { source: "MongoDB", target: "Express" }
        ]
    };

    // 根据熟练度定义节点样式 (颜色, 大小范围)
    function getNodeStyleByMastery(mastery) {
        switch(mastery) {
            case 'high':
                return { color: '#f97316', symbolSize: 48, borderColor: '#ffb347' };  // 橙色/高亮
            case 'medium':
                return { color: '#3b82f6', symbolSize: 36, borderColor: '#60a5fa' };
            case 'low':
                return { color: '#6b7280', symbolSize: 26, borderColor: '#9ca3af' };
            default:
                return { color: '#9ca3af', symbolSize: 30, borderColor: '#aaa' };
        }
    }

    // 构建 ECharts graph 所需数据
    function buildGraphData() {
        const nodes = skillsData.nodes.map(node => {
            const style = getNodeStyleByMastery(node.mastery);
            // 添加自定义字段用于 tooltip
            let masteryText = '';
            if (node.mastery === 'high') masteryText = '🔥 高熟练度 (核心技能)';
            else if (node.mastery === 'medium') masteryText = '📘 中熟练度 (常用)';
            else masteryText = '🌱 低熟练度 (了解/学习中)';
            
            return {
                name: node.name,
                mastery: node.mastery,
                symbolSize: style.symbolSize,
                itemStyle: {
                    color: style.color,
                    borderColor: style.borderColor,
                    borderWidth: 1.5,
                    shadowBlur: 8,
                    shadowColor: 'rgba(0,0,0,0.4)'
                },
                label: {
                    show: true,
                    fontSize: 11,
                    fontWeight: node.mastery === 'high' ? 'bold' : 'normal',
                    color: '#f0f3fa'
                },
                tooltipData: masteryText
            };
        });

        const links = skillsData.links.map(link => ({
            source: link.source,
            target: link.target,
            lineStyle: {
                color: '#5f6c84',
                width: 1.2,
                curveness: 0.2,
                opacity: 0.55
            }
        }));

        return { nodes, links };
    }

    // 初始化图表
    let graphChart = null;
    const chartDom=ref();
    function renderMasteryGraph() {
        console.log(chartDom.value);
        const container = chartDom.value;
        if (!container) return;
        graphChart = echarts.init(container);
        
        const { nodes, links } = buildGraphData();
        
        const option = {
            title: { show: false },
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    if (params.dataType === 'node') {
                        const nodeName = params.name;
                        const nodeRaw = skillsData.nodes.find(n => n.name === nodeName);
                        const mastery = nodeRaw ? nodeRaw.mastery : '';
                        let masteryLabel = '';
                        if (mastery === 'high') masteryLabel = '高熟练度 ⚡';
                        else if (mastery === 'medium') masteryLabel = '中熟练度 📌';
                        else masteryLabel = '低熟练度 🌱';
                        return `<strong>${nodeName}</strong><br/>熟练度: ${masteryLabel}<br/>点击拖拽查看关联`;
                    } else if (params.dataType === 'edge') {
                        return `🔗 关联: ${params.data.source} → ${params.data.target}`;
                    }
                    return params.name;
                },
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderColor: '#f97316',
                textStyle: { color: '#fff', fontSize: 12 }
            },
            series: [{
                type: 'graph',
                layout: 'force',           // 力导向布局
                force: {
                    repulsion: 600,         // 节点斥力
                    edgeLength: [100, 180], // 边长范围
                    gravity: 0.08,
                    friction: 0.1,
                    layoutAnimation: true
                },
                roam: true,                // 允许缩放/拖拽
                draggable: true,
                data: nodes,
                links: links,
                label: {
                    show: true,
                    position: 'right',
                    offset: [8, 0],
                    fontSize: 11,
                    fontWeight: 'normal',
                    color: '#d1d5db',
                    formatter: (params) => params.name
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 2.5,
                        color: '#facc15'
                    }
                },
                lineStyle: {
                    color: '#6b7280',
                    curveness: 0.2,
                    width: 1.2,
                    opacity: 0.6
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [0, 6],
                itemStyle: {
                    borderWidth: 1.5,
                    shadowBlur: 10
                },
                symbolSize: (value, params) => params.data.symbolSize,
                // 动画
                animation: true,
                animationDuration: 800,
                animationEasingUpdate: 'cubicOut'
            }],
            backgroundColor: 'transparent'
        };
        
        graphChart.setOption(option);
        
        // 响应窗口大小变化
        window.addEventListener('resize', () => {
            if (graphChart) graphChart.resize();
        });
    }
onMounted(() => {
    renderMasteryGraph();   })
    // 页面加载后渲染

    // 可选：暴露更新数据的方法，方便控制台动态修
    
    // 添加快捷提示（控制台指导）
    setTimeout(() => {
        console.log('💡 提示：可通过 updateSkillsGraph(newNodes, newLinks) 动态更新图谱');
    }, 1000);


</script>
<style scoped lang="less">
</style>
