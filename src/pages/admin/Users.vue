<template>
  <div class="min-h-screen bg-[var(--bg)]">
    <!-- 后台导航栏 -->
    <header class="h-[56px] flex items-center justify-between px-6 border-b border-[var(--border)]/70 backdrop-blur bg-black/20">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-[var(--accent-bg)] border border-[var(--accent-border)]/70 flex items-center justify-center">
          <span class="text-[var(--accent)] font-mono font-semibold">AD</span>
        </div>
        <div class="leading-tight">
          <div class="text-[var(--text-h)] font-semibold">后台管理</div>
          <div class="text-xs opacity-70">用户管理</div>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <span class="text-sm text-[var(--text-h)]">管理员</span>
        <button class="h-9 px-4 rounded-lg bg-black/20 border border-[var(--border)]/70 hover:border-[var(--accent)]/60 text-sm" @click="handleLogout">
          退出登录
        </button>
      </div>
    </header>
    
    <!-- 后台主体内容 -->
    <div class="flex">
      <!-- 侧边栏 -->
      <aside class="w-[240px] shrink-0 border-r border-[var(--border)]/70 bg-black/15 backdrop-blur min-h-[calc(100svh-56px)]">
        <nav class="p-4 space-y-2">
          <div class="text-xs font-medium opacity-60 mb-4">菜单</div>
          <a href="/admin/dashboard" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>📊</span>
            <span>仪表盘</span>
          </a>
          <a href="/admin/users" class="flex items-center gap-3 px-4 py-2 rounded-lg bg-[var(--accent-bg)]/30 text-[var(--accent)]">
            <span>👥</span>
            <span>用户管理</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>📝</span>
            <span>内容管理</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>⚙️</span>
            <span>系统设置</span>
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/20">
            <span>📈</span>
            <span>数据统计</span>
          </a>
        </nav>
      </aside>
      
      <!-- 主内容区 -->
      <main class="flex-1 p-6">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-[var(--text-h)]">用户管理</h1>
            <p class="mt-1 text-sm opacity-70">管理系统用户</p>
          </div>
          <el-button type="primary" @click="dialogVisible = true">
            <el-icon><Plus /></el-icon>
            <span>添加用户</span>
          </el-button>
        </div>
        
        <!-- 用户列表 -->
        <GlassCard>
          <el-table :data="users" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="role" label="角色" />
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </GlassCard>
        
        <!-- 添加/编辑用户对话框 -->
        <el-dialog
          v-model="dialogVisible"
          :title="dialogTitle"
          width="500px"
        >
          <el-form :model="userForm" :rules="rules" ref="userFormRef">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="!editMode">
              <el-input v-model="userForm.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select v-model="userForm.role" placeholder="请选择角色">
                <el-option label="管理员" value="admin" />
                <el-option label="普通用户" value="user" />
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleSave">保存</el-button>
            </span>
          </template>
        </el-dialog>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import GlassCard from '../../components/dashboard/GlassCard.vue';

const router = useRouter();
const users = ref([]);
const dialogVisible = ref(false);
const dialogTitle = ref('添加用户');
const editMode = ref(false);
const userFormRef = ref(null);

const userForm = reactive({
  id: '',
  username: '',
  password: '',
  role: 'user'
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ]
};

// 检查登录状态
const checkLoginStatus = () => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  if (!isLoggedIn) {
    router.push('/admin');
  }
};

// 处理退出登录
const handleLogout = () => {
  localStorage.removeItem('adminLoggedIn');
  router.push('/admin');
};

// 获取用户列表
const getUsers = async () => {
  try {
    // 模拟API请求
    // const response = await axios.get('/api/admin/users');
    // users.value = response.data.data;
    
    // 模拟数据
    users.value = [
      { id: 1, username: 'admin', role: 'admin' },
      { id: 2, username: 'user1', role: 'user' },
      { id: 3, username: 'user2', role: 'user' }
    ];
  } catch (error) {
    console.error('获取用户列表失败:', error);
  }
};

// 处理添加用户
const handleAddUser = () => {
  editMode.value = false;
  dialogTitle.value = '添加用户';
  userForm.id = '';
  userForm.username = '';
  userForm.password = '';
  userForm.role = 'user';
  dialogVisible.value = true;
};

// 处理编辑用户
const handleEdit = (row) => {
  editMode.value = true;
  dialogTitle.value = '编辑用户';
  userForm.id = row.id;
  userForm.username = row.username;
  userForm.role = row.role;
  dialogVisible.value = true;
};

// 处理保存用户
const handleSave = () => {
  if (!userFormRef.value) return;
  
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (editMode.value) {
          // 编辑用户
          const index = users.value.findIndex(u => u.id === userForm.id);
          if (index !== -1) {
            users.value[index] = { ...userForm };
          }
        } else {
          // 添加用户
          const newUser = {
            id: users.value.length + 1,
            ...userForm
          };
          users.value.push(newUser);
        }
        dialogVisible.value = false;
      } catch (error) {
        console.error('保存用户失败:', error);
      }
    }
  });
};

// 处理删除用户
const handleDelete = (id) => {
  if (id === 1) {
    // 不能删除管理员账号
    return;
  }
  
  users.value = users.value.filter(u => u.id !== id);
};

// 页面加载时检查登录状态并获取用户列表
onMounted(() => {
  checkLoginStatus();
  getUsers();
});
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>