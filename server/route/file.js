const express = require('express')
const multer = require('multer')
const router = express.Router()
// 配置上传文件夹与文件名
let keepname
let storage = multer.diskStorage({
    destination(req, file, cd) {
        // 设置文件夹位置
        cd(null, './upimg') //因为根路径在server.js中，所以以server.js为基础建立路径
    },
    filename(req, file, cd) {
        console.log(file)
        /*file是{ 
                fieldname: 'upimg',
                originalname: 'logo.jpg',//文件名
                encoding: '7bit',
                mimetype: 'image/jpeg'
            } */
        let index = file.originalname.lastIndexOf('.')
        console.log(index)
        suffix = file.originalname.slice(index)
        console.log(suffix)
        keepname = Date.now() + suffix
        cd(null, keepname)
    }
})
// 传递配置给上传对象
const upload = multer({
    storage
})
// 将图片上传模块映射到路由中
router.post('/upimg', upload.single('upimg'), (req, res) => {
    res.send({
        msg:'成功',
        data:'/upimg/'+keepname
    })
})

module.exports = router