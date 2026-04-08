const express = require('express')
const app = express()
const port = 3000
const githubRouter = require('./routers/github')

app.use('/', githubRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
