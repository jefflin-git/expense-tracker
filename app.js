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

//設定express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//設定method-override
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('test')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT} at ${Date()}`)
})