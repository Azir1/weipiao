// 安装依赖
// npm i -S express mongoose body-parser crypto jsonwebtoken
const express = require('express')
const user = require('./route/user')
const upimg = require('./route/file')
const recommend = require('./route/recommend')
const app = express()
// cros跨域
app.use('/',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Credential','true');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    next();
})
app.use('/user',user)
app.use('/file',upimg)
app.use('/data',recommend)

app.listen(9000)