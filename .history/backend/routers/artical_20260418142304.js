const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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
const uploadDir = path.join(__dirname, '../public/artical');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名：时间戳 + 随机数 + 原扩展名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 限制
});

const PORT = 3002
router.post("/upload",upload.single('file'),(req,res)=>{
   if (!req.file) {
    return res.status(400).json({ error: '请选择文件' });
  }
  console.log(req.body)
  // 返回文件信息
  const sql="insert into articles(title,file_path,description,total_views) values(?,?,?,?)"
  const fileUrl = `http://localhost:${PORT}/public/artical/${req.file.filename}`;
  pool.query(sql,[req.body.title,fileUrl,req.body.description,0],(err,result)=>{
    if(err){
      res.send({status:400,message:err.message})
    }else{
       res.send({
        status:200,
        message: '上传成功',    
  });
    }
  })
 
})
// 删除文章
router.delete("/delete/:id",(req,res)=>{
  const id = req.params.id
  const sql="delete from articles where id=?"
  pool.query(sql,[id],(err,result)=>{
    if(err){
      res.send({status:400,message:err.message})
    }else{
      res.send({status:200,message:"删除成功"})
    }
  })
})






module.exports = router