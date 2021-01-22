//引用Express與Express路由器
const express = require('express')
const router = express.Router()

//引入model
const Record = require('../../models/record')
const Category = require('../../models/category')

//閱覽清單路由
router.get('/', async (req, res) => {
  try {
    let categorySelect = req.query.category
    let monthSelect = req.query.month
    let monthSearch = `[0-9]{4}-${monthSelect}-[0-9]{2}`
    const userId = req.user._id
    let totalAmount = 0
    const categories = await Category.find().lean()

    if (categorySelect === 'all' || categorySelect === undefined) {
      categorySelect = ""
    }

    if (monthSelect === 'all' || monthSelect === undefined) {
      monthSelect = ""
      monthSearch = ""
    }


    const query = {
      $and: [
        { category: { $regex: categorySelect, $options: 'i' }, userId },
        { date: { $regex: monthSearch, $options: 'i' }, userId }
      ]
    }

    Record.find(query)
      .lean()
      .then(records => {
        records.forEach(record => {
          totalAmount += record.amount
          record.icon = categories.find(category => category.title === record.category)
        })
        res.render('index', { records, totalAmount, categorySelect, monthSelect })
      })
  } catch (err) {
    console.error(err)
    res.render('error', { message: 'filter error !' })
  }
})

//匯出路由器
module.exports = router
