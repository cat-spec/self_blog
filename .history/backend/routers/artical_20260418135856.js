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
      res.json({status:400,message:err.message})
    }else{
      res.json({status:200,data:result})
    }
  })
})
// 文件上传
router.post("/upload",upload.single('file'),(req,res)=>{
    console.log(req.file)
    const { description, title } = req.body;
    console.log(req.body)
})



module.exports = router