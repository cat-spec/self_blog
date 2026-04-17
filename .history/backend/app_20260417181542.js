const express = require('express')
const app = express()
const port = 3001
const githubRouter = require('./routers/github')
const adminRouter = require('./routers/admin')
const platformRouter = require('./routers/platform')
// 解析 JSON 请求体
app.use(express.json())



// 加载数据库配置
require('./config/database')
// 加载模型
require('./models/User')

console.log(platformRouter)
app.use('/', githubRouter)
app.use('/platform', platformRouter)
app.use('/', adminRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
