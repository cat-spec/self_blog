const express = require('express')
const router = express.Router()

const pool=require('../config/mysql')

// 简单的测试路由
let sql='select * from platform_stats'
router.get('/', (req, res) => {
  pool.query(sql,(err,result)=>{
    if(err){
      res.json({success:false,message:err.message})
    }else{
      res.json({success:true,data:result})
    }
  })
})


module.exports = router