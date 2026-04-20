const express = require('express')
const router = express.Router()
API_KEY = "sk-7455805049c445358ab57fecedf8d2c7"
// 需要 Node.js v18+，需在 ES Module 环境下运行
import OpenAI from "openai";

const openai = new OpenAI(
    {
        // 各地域的API Key不同。获取API Key：https://help.aliyun.com/zh/model-studio/get-api-key
        // 若没有配置环境变量，请用阿里云百炼API Key将下行替换为：apiKey: "sk-xxx",
        apiKey: API_KEY,
        // 各地域的base_url不同
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
);

router.post('/aichart', async (req, res) => {
    const { message } = req.body
    console.log(message)
// const completion = await openai.chat.completions.create({
//     model: "qwen3.6-plus",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: message }
//     ],
// });
// console.log(completion.choices[0].message.content);

})




// 如需查看完整响应，请取消下列注释
// console.log(JSON.stringify(completion, null, 4));