// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const PORT = 3000
//載入express-handlebars
const exphbs = require('express-handlebars')
// 引用body-parser
const bodyParser = require('body-parser')
//載入method-override
const methodOverride = require('method-override')
//引用mongoose.js
require('./config/mongoose')

const Record = require('./models/record')
const Category = require('./models/category')
const handlebars = require('handlebars')

//載入static file
app.use(express.static('public'))

// register helper
handlebars.registerHelper('ifEquals', function (job, targetJob, options) {
  if (job === targetJob) {
    return options.fn(this)
  }
  return options.inverse(this)
})

//設定express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//設定method-override
app.use(methodOverride('_method'))

//閱覽清單路由
app.get('/', async (req, res) => {
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

//進入新增頁面路由
app.get('/new', (req, res) => {
  res.render('new')
})

//進入編輯頁面路由
app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id).lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})


//新增支出路由
app.post('/new', (req, res) => {
  const newRecord = req.body
  Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//編輯支出路由
app.put('/edit/:id', (req, res) => {
  const id = req.params.id
  const editRecord = req.body
  Record.findById(id)
    .then(record => {
      record = Object.assign(record, editRecord)
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除路由
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT} at ${Date()}`)
})