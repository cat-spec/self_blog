<template>
  
    <AppLayout>
      <h1>千文ai</h1>
      <div class="chat-page">
    <!-- 左侧会话列表（静态示意） -->
    <aside class="conversation-sidebar">
      <div class="conversation-item active">
        <img class="avatar" src="https://via.placeholder.com/40" alt="avatar" />
        <div class="info">
          <div class="name">张三</div>
          <div class="preview">最后一条消息...</div>
        </div>
      </div>
      <div class="conversation-item">
        <img class="avatar" src="https://via.placeholder.com/40" alt="avatar" />
        <div class="info">
          <div class="name">李四</div>
          <div class="preview">你好，在吗？</div>
        </div>
      </div>
      <div class="conversation-item">
        <img class="avatar" src="https://via.placeholder.com/40" alt="avatar" />
        <div class="info">
          <div class="name">产品群</div>
          <div class="preview">有人有新想法吗？</div>
        </div>
      </div>
    </aside>

    <!-- 右侧聊天主区域 -->
    <main class="chat-main">
      <!-- 聊天头部 -->
      <header class="chat-header">
        <div class="contact-name">张三</div>
        <div class="contact-status">在线</div>
      </header>

      <!-- 消息列表区域 -->
      <div class="message-list">
        <!-- 对方消息（左侧气泡） -->
        <div class="message-item other">
          <img class="msg-avatar" src="https://via.placeholder.com/32" alt="avatar" />
          <div class="bubble">你好！今天有空吗？</div>
          <div class="time">10:24</div>
        </div>
        <!-- 自己消息（右侧气泡） -->
        <div class="message-item self">
          <div class="bubble">有的，下午3点会议室见？</div>
          <div class="time">10:25</div>
        </div>
        <div class="message-item other">
          <img class="msg-avatar" src="https://via.placeholder.com/32" alt="avatar" />
          <div class="bubble">好的，到时候聊。</div>
          <div class="time">10:26</div>
        </div>
        <!-- 可以继续添加静态消息 -->
      </div>

      <!-- 消息输入区域 -->
      <footer class="input-area">
        <div class="toolbar">
          <button class="tool-btn" title="表情">😊</button>
          <button class="tool-btn" title="图片">🖼️</button>
          <button class="tool-btn" title="文件">📎</button>
        </div>
        <div class="input-wrapper">
          <textarea
            class="message-input"
            placeholder="输入消息..."
            rows="2"
          ></textarea>
          <button class="send-btn">发送</button>
        </div>
      </footer>
    </main>
  </div>
    </AppLayout>
  
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import AppLayout from '../components/dashboard/AppLayout.vue'
</script>
<style scoped lang="less">
</style>