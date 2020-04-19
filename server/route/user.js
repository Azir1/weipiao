const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
// 解析body中的数据
const parser = bodyParser.urlencoded({ extended: false })
// 链接数据库
const ColUser = require('./db')
// 加密密码
const crypto = require('crypto')
// 返回token
const jwt = require('jsonwebtoken')
// 注册
router.post('/register', parser, (req, res) => {
    const username = req.body.username
    let password = req.body.password
    password = crypto.createHash('md5').update(password).digest('hex')
    const user = new ColUser({
        username,
        password
    })
    ColUser.find({ //查找用户名是否存在
        username
    })
        .then(ok => {
            console.log(ok)
            if (ok.length === 0) {
                user.save()
                    .then(ok => {
                        res.send({
                            msg: '注册成功',
                            state: 1
                        })
                    })
                    .catch(err => {
                        res.send({
                            msg: '注册失败',
                            state: 2
                        })
                    })
            } else {
                res.send({
                    msg: '用户名已存在',
                    state: 3
                })
            }
        })

})
const key = 'asdfjlj' //定义token密钥
// 判断用户是否登陆
router.post('/index', parser, (req, res) => {
    jwt.verify(req.body.token, key, (err, ok) => {
        if (!ok.login) { // ok: { login: true, iat: 1587201932 }
            res.send({
                msg: '非法登陆',
                state: 2
            })
        } else {
            res.send({
                msg: '合法登陆',
                state: 1
            })
        }
    })
})
// 登陆
router.post('/login', parser, (req, res) => {
    const username = req.body.username
    let password = req.body.password
    // 加密密码，进行对比
    password = crypto.createHash('md5').update(password).digest('hex')
    ColUser.find({
        username,
        password
    })
        .then(ok => {
            if (ok.length > 0) {
                const usermsg = {
                    login: true
                }

                const token = jwt.sign(usermsg, key)
                res.send({
                    msg: '登陆成功',
                    state: 1,
                    token
                })

            } else {
                res.send({
                    msg: '用户名或密码错误',
                    state: 2
                })
            }
        })
})
module.exports = router