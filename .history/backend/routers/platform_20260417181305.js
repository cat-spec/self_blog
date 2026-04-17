const express = require('express')
const router = express.Router()
const pool = require('../config/mysql')

router.use(
    console.log('platform router')
)

const sql="SELECT * FROM platform_stats"
router.get("/info", (req, res) => {
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