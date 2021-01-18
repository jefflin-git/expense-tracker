// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//載入express-handlebars
const exphbs = require('express-handlebars')
// 引用body-parser
const bodyParser = require('body-parser')
//載入method-override
const methodOverride = require('method-override')
//引用mongoose.js
require('./config/mongoose')
//引入路由器
const routes = require('./routes/index.js')
//引入register helper模駔
const helper = require('./helper')
const session = require('express-session')
const usePassport = require('./config/passport')
const locals = require('./middleware/locals')

//載入static file
app.use(express.static('public'))

//設定express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//設定method-override
app.use(methodOverride('_method'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

locals(app)

//將傳入伺服器的request導入路由器
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT} at ${Date()}`)
})