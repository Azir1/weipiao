const express = require('express')
const router = express.Router()
const ColMsg = require('./data-db')
router.get('/recommend', (req, res) => {
    ColMsg.find()
        .then(ok => {
            res.send({
                msg: '请求数据成功',
                data: ok
            })

        })
        .catch(err => {
            res.send({
                msg: '请求数据失败',
            })
        })
})

module.exports = router