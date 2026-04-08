// github路由

const { ro } = require('element-plus/es/locale/index.mjs')
const express = require('express')
const router = express.Router()

router.get('/github', (req, res) => {
  res.send('github')
})