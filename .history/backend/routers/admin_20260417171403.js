const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 登录接口
router.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { username, password } });
    
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
  } catch (error) {
    console.error('登录错误:', error);
    res.json({
      success: false,
      message: '登录失败，请重试'
    });
  }
});

// 获取用户列表接口
router.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role']
    });
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('获取用户列表错误:', error);
    res.json({
      success: false,
      message: '获取用户列表失败'
    });
  }
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