<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--bg)]">
    <div class="w-full max-w-md p-8 bg-black/20 backdrop-blur rounded-2xl border border-[var(--border)]/80 shadow-lg">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-[var(--text-h)]">后台登录</h1>
        <p class="mt-2 text-sm opacity-70">请输入管理员账号和密码</p>
      </div>
      
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full" @click="handleLogin" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div v-if="error" class="mt-4 text-center text-red-500 text-sm">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginFormRef = ref(null);
const loading = ref(false);
const error = ref('');

const loginForm = reactive({
  username: '',
  password: ''
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};

const handleLogin = async () => {
  if (!loginFormRef.value) return;
  
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      error.value = '';
      
      try {
        // 发送登录请求到后端 API
        const response = await fetch('http://localhost:3002/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginForm)
        });
        
        const data = await response.json();
        
        if (data.success) {
          // 存储登录状态
          localStorage.setItem('adminLoggedIn', 'true');
          // 跳转到后台控制面板
          router.push('/admin/dashboard');
        } else {
          error.value = data.message || '登录失败';
        }
      } catch (err) {
        error.value = '登录失败，请重试';
        console.error('Login error:', err);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>

