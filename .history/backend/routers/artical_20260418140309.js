const express = require('express')
const router = express.Router()
const multer = require('multer')

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
const uploadDir = path.join(__dirname, 'artical');
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


router.post("/upload",upload.single('file'),(req,res)=>{
    console.log(req.file)
    const { description, title } = req.body;
    console.log(req.body)
})



module.exports = router