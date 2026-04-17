const express = require('express')
const router = express.Router()
const pool = require('../config/mysql')

router.use(
   (req, res, next)=>{
    console.log('平台统计路由被调用')
    next()
   }
)

const sql="SELECT * FROM platform_stats"
router.get("api/platform/info", (req, res) => {
pool.query(sql, (err, results) => {
  if (err) {
    console.error('查询数据库失败:', err)
    res.status(500).json({ error: '查询数据库失败' })
    return
  }else{
    console.log(results)
   res.send({
    status: "success",
    data: results
   })}
})
})

module.exports = router