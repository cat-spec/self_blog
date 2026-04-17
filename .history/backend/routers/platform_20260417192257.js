const express = require('express')
const router = express.Router()

const pool=require('../config/mysql')

// 简单的测试路由
let sql='select * from platform_stats'
router.get('/', (req, res) => {
  
})

router.get('/test', (req, res) => {
  res.send({ message: 'Test route works!' })
})

module.exports = router