const express = require('express')
const router = express.Router()

const pool=require('../config/mysql')

// 简单的测试路由
router.get('/', (req, res) => {
  res.send('Platform route works!')
})

router.get('/test', (req, res) => {
  res.send({ message: 'Test route works!' })
})

module.exports = router