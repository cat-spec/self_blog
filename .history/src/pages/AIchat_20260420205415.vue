<template>
  
    <AppLayout>
      <h1>千文ai</h1>
      <div class="chat-container">
    <!-- 会话列表 -->
    <div class="conversation-list">
      <div 
        v-for="conv in conversations" 
        :key="conv.id"
        @click="selectConversation(conv)"
      >
        <img :src="conv.avatar" />
        <span>{{ conv.name }}</span>
      </div>
    </div>

    <!-- 消息展示区 -->
    <div class="message-area">
      <div 
        v-for="msg in messages" 
        :key="msg.id"
        :class="['message', msg.isSelf ? 'self' : 'other']"
      >
        <div class="bubble">{{ msg.content }}</div>
      </div>
    </div>

    <!-- 消息输入区 -->
    <div class="input-area">
      <textarea v-model="inputText" @keydown.enter="sendMessage" />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
    </AppLayout>
  
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted} from 'vue'
import AppLayout from '../components/dashboard/AppLayout.vue'
</script>
<style scoped lang="less">
</style>