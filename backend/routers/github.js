// github路由
const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/github', (req, res) => {
  res.send('github')
})

// 固定读取本机 markdown（用于 GardenDetail 展示）
router.get('/notes/tailwind', async (req, res) => {
  try {
    const tailwindMdPath = '../assets/tailwind学习.md'
    const md = await fs.promises.readFile(tailwindMdPath, 'utf8')
    res.type('text/markdown').send(md)
  } catch (e) {
    res.status(500).json({
      message: 'Failed to read tailwind markdown file',
      // 避免把敏感路径完全暴露给前端；但开发调试时保留错误信息会更快
      error: String(e?.message || e),
    })
  }
})

module.exports = router
