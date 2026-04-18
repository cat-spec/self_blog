const express = require('express')
const router = express.Router()
const pool = require('../config/mysql')

router.get("/test",(req,res)=>{
  res.send({message:"test route works!"})
})
// 文章列表
const sql="select * from articles"
router.get("/artlist",(req,res)=>{
  pool.query(sql,(err,result)=>{
    if(err){
      res.json({success:false,message:err.message})
    }else{
      res.json({success:true,data:result})
    }
  })
})




module.exports = router