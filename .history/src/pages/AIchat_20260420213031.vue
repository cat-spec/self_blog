<template>
  
    <AppLayout>
      <div class="chat-page">
    <!-- 右侧聊天主区域 -->
    <main class="chat-main">
      <!-- 聊天头部 -->
      <header class="chat-header">
        <div class="contact-name">千文ai</div>
        <div class="contact-status">在线</div>
      </header>
      <!-- 消息列表区域 -->
      <div class="message-list">
        <!-- 对方消息（左侧气泡） -->
        <div v-for="item in AImessage" :key="item" class="message-item other">
          <!-- <img class="msg-avatar" src="" alt="avatar" /> -->
           🤖
          <div class="bubble">{{ item }}</div>
        </div>
        <!-- 自己消息（右侧气泡） -->
        <div v-for="item in memessage" :key="item" class="message-item self">
          <div class="bubble">{{ item }}</div>
        </div>
      </div>
      <!-- 消息输入区域 -->
      <footer class="input-area">
        <div class="input-wrapper">
          <textarea
            v-model="message"
            class="message-input"
            placeholder="输入消息..."
            rows="2"
          ></textarea>
          <button class="send-btn" @click="sendessage">发送</button>
        </div>
      </footer>
    </main>
  </div>
    </AppLayout>
  
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import AppLayout from '../components/dashboard/AppLayout.vue'
import { sendMessage } from '../api/aichat'
let AImessage = ref([])
let memessage= ref([])
let message = ref('')

const sendessage = async () => {

    memessage.value.push(message.value)
    const res = await sendMessage(message.value)
    console.log(res)
    AImessage.value.push(res.data)
}



</script>
<style scoped>
/* 整体页面布局 */
.chat-page {
  display: flex;
  height: 100vh;           /* 全屏高度，可根据需要调整 */
  width: 100%;
  background-color: #f5f7fa;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* 左侧会话列表 */
.conversation-sidebar {
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f2f5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.conversation-item:hover {
  background-color: #f8f9fa;
}

.conversation-item.active {
  background-color: #e7f3ff;
  border-left: 3px solid #1890ff;
}

.conversation-item .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.conversation-item .info {
  flex: 1;
  overflow: hidden;
}

.conversation-item .name {
  font-weight: 500;
  font-size: 14px;
  color: #1f2d3d;
  margin-bottom: 4px;
}

.conversation-item .preview {
  font-size: 12px;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 右侧聊天主区域 */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

/* 聊天头部 */
.chat-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e9ecef;
  background-color: #ffffff;
}

.chat-header .contact-name {
  font-size: 16px;
  font-weight: 500;
  color: #1f2d3d;
}

.chat-header .contact-status {
  font-size: 12px;
  color: #52c41a;
  margin-top: 4px;
}

/* 消息列表区域 */
.message-list {
  flex: 1;
  padding: 20px 24px;
  overflow-y: auto;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 单条消息容器 */
.message-item {
  display: flex;
  align-items: flex-start;
  max-width: 70%;
}

/* 对方消息（左） */
.message-item.other {
  align-self: flex-start;
}

.message-item.other .msg-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
}

.message-item.other .bubble {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  color: #1f2d3d;
}

/* 自己消息（右） */
.message-item.self {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-item.self .bubble {
  background-color: #1890ff;
  color: white;
  margin-right: 10px;
}

.message-item.self .time {
  margin-left: 0;
  margin-right: 10px;
}

/* 气泡样式 */
.bubble {
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  position: relative;
}

/* 时间戳 */
.time {
  font-size: 11px;
  color: #8c8f91;
  margin-left: 10px;
  align-self: flex-end;
  white-space: nowrap;
}

/* 输入区域 */
.input-area {
  border-top: 1px solid #e9ecef;
  background-color: #ffffff;
  padding: 12px 24px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.tool-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  color: #6c757d;
  transition: color 0.2s;
}

.tool-btn:hover {
  color: #1890ff;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.message-input {
  flex: 1;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.message-input:focus {
  border-color: #1890ff;
}

.send-btn {
  background-color: #1890ff;
  border: none;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-btn:hover {
  background-color: #40a9ff;
}
</style>