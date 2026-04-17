const express = require('express')
const app = express()
const port = 3002

// 解析 JSON 请求体
app.use(express.json())

// 平台路由
const platformRouter = require('./routes/platform')
app.use('/platform', platformRouter)



// 启动服务器
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // 保持服务器运行
  process.stdin.resume()
})
