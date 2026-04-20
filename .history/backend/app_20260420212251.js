const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const port = 3002


// 解析 JSON 请求体
app.use(express.json())

// 文章路由
const articalRouter = require('./routers/artical')
app.use('/api/artical', articalRouter)


// 平台路由
const platformRouter = require('./routers/platform')
app.use('/api/platform', platformRouter)

//用户路由
const userRouter = require('./routers/admin')
app.use('/api/admin', userRouter)

// 聊天路由
const chatRouter = require('./routers/aiChat')
app.use('/api/', chatRouter)



//静态资源
app.use(express.static('public'))


// 启动服务器
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // 保持服务器运行
})
