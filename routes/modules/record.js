//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入model
const Record = require('../../models/record')

//進入新增頁面路由
router.get('/new', (req, res) => {
    res.render('new')
})

//進入編輯頁面路由
router.get('/edit/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Record.findOne({ userId, _id }).lean()
        .then(record => res.render('edit', { record }))
        .catch(error => {
            console.log(error)
            res.render('error', { message: 'edit error !' })
        })
})


//新增支出路由
router.post('/new', (req, res) => {
    const newRecord = req.body
    newRecord.userId = req.user._id
    Record.create(newRecord)
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error)
            res.render('error', { message: 'add error !' })
        })
})

//編輯支出路由
router.put('/edit/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const editRecord = req.body
    Record.findOne({ userId, _id })
        .then(record => {
            record = Object.assign(record, editRecord)
            record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error)
            res.render('error', { message: 'edit error !' })
        })
})

//刪除路由
router.delete('/delete/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    Record.findOne({ userId, _id })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => {
            console.log(error)
            res.render('error', { message: 'delete error !' })
        })
})

//匯出路由器
module.exports = router