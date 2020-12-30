//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入home模組程式碼
const home = require('./modules/home')
//引入record模組程式碼
const record = require('./modules/record')

//將網址結構符合 / 字串的request導向home模組
router.use('/', home)
//將網址結構符合 /record 字串的request導向record模組
router.use('/record', record)

//匯出路由器
module.exports = router