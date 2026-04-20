<template>
  <div>
    <div class="dashboard">
    <div class="header">
        <div class="title-section">
            <h1><i class="fas fa-chalkboard-user" style="margin-right: 8px; color: #3b82f6;"></i> 经历仪表盘</h1>
            <p><i class="fas fa-timeline"></i> 垂直时间轴 · 记录每一个重要阶段  <span class="badge-count" id="expCount">0</span> 项经历</p>
        </div>
        <div class="action-buttons">
            <button class="btn-outline" id="resetBtn"><i class="fas fa-arrows-rotate"></i> 重置示例</button>
            <button class="btn-primary" id="addNewBtn"><i class="fas fa-plus-circle"></i> 新增经历</button>
        </div>
    </div>

    <!-- 时间轴容器 -->
    <div id="timelineContainer" class="timeline">
        <!-- 动态渲染js -->
    </div>
    <footer>💡 点击卡片上的 <i class="fas fa-edit"></i> 编辑 | <i class="fas fa-trash-alt"></i> 删除，或新增您的个人经历</footer>
</div>

<!-- 模态框表单 (新增/编辑) -->
<div id="expModal" class="modal">
    <div class="modal-content">
        <h3 id="modalTitle"><i class="fas fa-pen-alt"></i> 编辑经历</h3>
        <form id="expForm">
            <div class="form-group">
                <label>📅 时间段 *</label>
                <input type="text" id="period" placeholder="例如: 2022 - 至今 或 2018 - 2022" required>
            </div>
            <div class="form-group">
                <label>🏷️ 职位/标题 *</label>
                <input type="text" id="title" placeholder="例如: 高级前端工程师" required>
            </div>
            <div class="form-group">
                <label>🏢 公司/机构</label>
                <input type="text" id="subtitle" placeholder="例如: 字节跳动 / 某某大学">
            </div>
            <div class="form-group">
                <label>📝 详细描述</label>
                <textarea id="description" rows="3" placeholder="描述你的职责、成就、学习内容..."></textarea>
            </div>
            <div class="form-group">
                <label>🏷️ 技能标签 (用逗号分隔)</label>
                <input type="text" id="tagsInput" placeholder="React, Vue, Node.js, UI设计">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" id="closeModalBtn">取消</button>
                <button type="submit" class="btn-save">保存经历</button>
            </div>
        </form>
    </div>
</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'

</script>
<style scoped>
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

        /* 主容器 - 仪表盘风格 */
        .dashboard {
            max-width: 1280px;
            margin: 0 auto;
            background: rgba(255,255,255,0.6);
            backdrop-filter: blur(2px);
            border-radius: 2.5rem;
            box-shadow: 0 25px 45px -12px rgba(0,0,0,0.25);
            padding: 2rem 1.8rem;
            transition: all 0.2s;
        }

        /* 头部区域 */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
            margin-bottom: 2.5rem;
            border-bottom: 2px solid rgba(100,116,139,0.2);
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
        .badge-count {
            background: #3b82f6;
            color: white;
            border-radius: 40px;
            padding: 0.2rem 0.7rem;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .action-buttons {
            display: flex;
            gap: 12px;
        }
        .btn-primary, .btn-outline {
            border: none;
            padding: 0.6rem 1.3rem;
            border-radius: 40px;
            font-weight: 600;
            font-size: 0.85rem;
            cursor: pointer;
            transition: 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .btn-primary {
            background: #1e293b;
            color: white;
            border: 1px solid #334155;
        }
        .btn-primary:hover {
            background: #0f172a;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(0,0,0,0.2);
        }
        .btn-outline {
            background: rgba(255,255,255,0.7);
            border: 1px solid #cbd5e1;
            color: #334155;
        }
        .btn-outline:hover {
            background: white;
            border-color: #3b82f6;
            color: #1e293b;
        }

        /* 时间轴容器 */
        .timeline {
            position: relative;
            padding-left: 20px;  /* 与圆点、线对齐关键 */
            margin-top: 1rem;
        }
        /* 全局垂直线 (桌面端) */
        .timeline::before {
            content: '';
            position: absolute;
            left: 180px;   /* 基于左padding 20px + 左侧宽度160px (20+160=180) */
            top: 12px;
            bottom: 12px;
            width: 2.5px;
            background: linear-gradient(to bottom, #94a3b8, #3b82f6, #94a3b8);
            border-radius: 4px;
            opacity: 0.7;
        }

        /* 每个时间轴条目 */
        .timeline-item {
            position: relative;
            display: flex;
            margin-bottom: 2.5rem;
            transition: all 0.2s;
        }
        /* 左侧时间区域 */
        .timeline-period {
            width: 160px;
            flex-shrink: 0;
            padding-right: 20px;
            font-weight: 700;
            font-size: 1rem;
            color: #1e40af;
            letter-spacing: -0.2px;
            display: flex;
            align-items: baseline;
            gap: 6px;
            flex-wrap: wrap;
        }
        .period-badge {
            background: #e0f2fe;
            padding: 4px 10px;
            border-radius: 30px;
            font-size: 0.75rem;
            font-weight: 600;
            color: #0369a1;
        }
        /* 圆点 (与全局线对齐) */
        .timeline-dot {
            position: absolute;
            left: 154px;   /* 精密计算: 父容器padding-left 20px, 线位于180px, 圆点宽12px, 中心180 => left 174相对于父容器, 再减去条目起始偏移20 => 154px */
            top: 24px;
            width: 12px;
            height: 12px;
            background: #3b82f6;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
            z-index: 2;
            transition: 0.2s;
        }
        /* 卡片容器 */
        .timeline-card {
            flex: 1;
            margin-left: 28px;
            background: white;
            border-radius: 28px;
            padding: 1.2rem 1.5rem;
            box-shadow: 0 12px 24px -12px rgba(0,0,0,0.12);
            transition: transform 0.2s, box-shadow 0.2s;
            border: 1px solid rgba(203,213,225,0.5);
            position: relative;
        }
        .timeline-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 30px -12px rgba(0,0,0,0.2);
            border-color: #b9d0f0;
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 12px;
        }
        .card-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: #0f172a;
        }
        .card-sub {
            font-weight: 500;
            color: #3b82f6;
            font-size: 0.85rem;
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .card-actions {
            display: flex;
            gap: 10px;
        }
        .icon-btn {
            background: transparent;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            color: #64748b;
            transition: 0.2s;
            padding: 5px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .icon-btn.edit-btn:hover {
            background: #eef2ff;
            color: #2563eb;
        }
        .icon-btn.delete-btn:hover {
            background: #fee2e2;
            color: #dc2626;
        }
        .card-description {
            color: #334155;
            line-height: 1.5;
            font-size: 0.9rem;
            margin: 12px 0 12px 0;
        }
        .tag-group {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }
        .tag {
            background: #f1f5f9;
            padding: 4px 12px;
            border-radius: 30px;
            font-size: 0.7rem;
            font-weight: 500;
            color: #1e293b;
            letter-spacing: 0.3px;
        }

        /* 模态框背景 */
        .modal {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(4px);
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal.active {
            display: flex;
        }
        .modal-content {
            background: white;
            width: 90%;
            max-width: 550px;
            border-radius: 2rem;
            padding: 2rem;
            box-shadow: 0 30px 40px rgba(0,0,0,0.2);
            animation: fadeUp 0.25s ease;
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
        }
        .modal-content h3 {
            font-size: 1.5rem;
            margin-bottom: 1.2rem;
        }
        .form-group {
            margin-bottom: 1.2rem;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
            font-size: 0.85rem;
            color: #1e293b;
        }
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 10px 14px;
            border-radius: 20px;
            border: 1px solid #cbd5e1;
            font-family: inherit;
            transition: 0.2s;
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
        }
        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 1.5rem;
        }
        .btn-cancel, .btn-save {
            border: none;
            padding: 8px 20px;
            border-radius: 40px;
            font-weight: 600;
            cursor: pointer;
        }
        .btn-cancel {
            background: #e2e8f0;
        }
        .btn-save {
            background: #1e293b;
            color: white;
        }
        /* 移动端适配 */
        @media (max-width: 760px) {
            body {
                padding: 1rem;
            }
            .dashboard {
                padding: 1.2rem;
            }
            .timeline::before {
                display: none;  /* 移动端隐藏全局线 */
            }
            .timeline {
                padding-left: 0;
            }
            .timeline-item {
                flex-direction: column;
                margin-bottom: 1.8rem;
            }
            .timeline-period {
                width: 100%;
                padding-right: 0;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .timeline-dot {
                display: none;  /* 移动端隐藏圆点 */
            }
            .timeline-card {
                margin-left: 0;
                width: 100%;
            }
            .card-header {
                flex-direction: column;
                align-items: flex-start;
            }
            .header {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
            }
            .action-buttons {
                width: 100%;
                justify-content: flex-start;
            }
        }
        /* 空状态 */
        .empty-state {
            text-align: center;
            padding: 3rem;
            background: #f8fafc;
            border-radius: 2rem;
            color: #64748b;
        }
        footer {
            text-align: center;
            margin-top: 2rem;
            font-size: 0.75rem;
            color: #5b6e8c;
        }
</style>