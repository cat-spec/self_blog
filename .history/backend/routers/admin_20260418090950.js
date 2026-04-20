const express = require('express');
const router = express.Router();

// 模拟用户数据
const users = [
  { id: 1, username: 'admin', password: '20031006lol', role: 'admin' },
  { id: 2, username: 'user', password: '123', role: 'user' }
];

// 登录接口
router.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      message: '登录成功',
      data: {
        username: user.username,
        role: user.role
      }
    });
  } else {
    res.json({
      success: false,
      message: '用户名或密码错误'
    });
  }
});

// 获取用户列表接口
router.get('/api/admin/users', (req, res) => {
  res.json({
    success: true,
    data: users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role
    }))
  });
});

// 获取系统信息接口
router.get('/api/admin/system', (req, res) => {
  res.json({
    success: true,
    data: {
      version: '1.0.0',
      frontend: 'Vue 3',
      ui: 'Element Plus',
      build: 'Vite'
    }
  });
});

module.exports = router;