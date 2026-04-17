const express = require('express')
const app = express()
const port = 3002

// 解析 JSON 请求体
app.use(express.json())

// 平台路由
app.get('/platform', (req, res) => {
  res.send('Platform route works!')
})

app.get('/platform/test', (req, res) => {
  res.send({ message: 'Test route works!' })
})

app.get('/platform/message', (req, res) => {
  res.send({
    status: "success",
    data: "平台统计路由被调用"
  })
})

app.get('/platform/api/platform/info', (req, res) => {
  // 模拟平台统计数据
  const platformStats = [
    { id: 1, name: '支付宝开放平台', status: '已接入', api_calls: 1234 },
    { id: 2, name: '百度开放平台', status: '已接入', api_calls: 5678 },
    { id: 3, name: '微信开放平台', status: '已接入', api_calls: 9012 }
  ]
  
  res.send({
    status: "success",
    data: platformStats
  })
})

// 模拟用户数据
const users = [
  { id: 1, username: 'admin', password: '20031006lol', role: 'admin' },
  { id: 2, username: 'user', password: '123', role: 'user' }
];

// 管理员路由
app.post('/admin/api/admin/login', (req, res) => {
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

app.get('/admin/api/admin/users', (req, res) => {
  res.json({
    success: true,
    data: users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role
    }))
  });
});

app.get('/admin/api/admin/system', (req, res) => {
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

// 启动服务器
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // 保持服务器运行
  process.stdin.resume()
})
