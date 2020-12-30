//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入model
const Record = require('../../models/record')
const Category = require('../../models/category')

//閱覽清單路由
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().lean()
        const records = await Record.find().lean()
        let filterRecords = records
        const option = req.query.category
        let totalAmount = 0

        filterRecords.forEach(record => record.icon = categories.find(category => category.title === record.category))

        if (option) {
            filterRecords = (option === '顯示全部') ? records : records.filter(record => record.category === option)
        }

        filterRecords.forEach(record => totalAmount += record.amount)

        res.render('index', { records: filterRecords, totalAmount, option })

    } catch (err) {
        console.error(err)
    }
})

//匯出路由器
module.exports = router