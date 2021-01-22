//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入model
const Record = require('../../models/record')
const Category = require('../../models/category')

//閱覽清單路由
router.get('/', async (req, res) => {
    try {
        const userId = req.user._id
        const categories = await Category.find().lean()
        const records = await Record.find({ userId }).lean().sort({ _id: 'desc' })
        let filterRecords = records
        const categoryOption = req.query.category
        const monthOption = req.query.month
        let totalAmount = 0

        filterRecords.forEach(record => record.icon = categories.find(category => category.title === record.category))

        if (categoryOption) {
            filterRecords = (categoryOption === '顯示全部') ? records : records.filter(record => record.category === categoryOption)
        }

        if (monthOption) {
            filterRecords = (monthOption === 'all') ? filterRecords : filterRecords.filter(record => Number(new Date(record.date).getMonth()) + 1 === Number(monthOption))
        }

        filterRecords.forEach(record => {
            totalAmount += record.amount
        })

        res.render('index', { records: filterRecords, totalAmount, monthOption, categoryOption })

    } catch (err) {
        console.error(err)
    }
})

//匯出路由器
module.exports = router