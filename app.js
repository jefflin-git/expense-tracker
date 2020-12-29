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

app.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  const option = req.query.category
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => record.icon = categories.find(category => category.title === record.category))

      if (option) {
        if (option === '顯示全部') {
          records.forEach(record => totalAmount += record.amount)
          res.render('index', { records, totalAmount, option })
        } else {
          selectRecord = records.filter(record => record.category === option)
          selectRecord.forEach(record => totalAmount += record.amount)
          res.render('index', { records: selectRecord, totalAmount, option })
        }
      } else {
        records.forEach(record => totalAmount += record.amount)
        res.render('index', { records, totalAmount, option })
      }
    })
    .catch(error => console.log(error))
})
app.get('/new', (req, res) => {
  res.render('new')
})

app.get('/edit', (req, res) => {
  res.render('edit')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT} at ${Date()}`)
})