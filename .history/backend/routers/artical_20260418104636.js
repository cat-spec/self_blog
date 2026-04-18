const express = require('express')
const router = express.Router()

router.get("/test",(req,res)=>{
  res.send({message:"test route works!"})
})

module.exports = router