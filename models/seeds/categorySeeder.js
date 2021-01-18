if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')
const seedData = require('../../seedData')
const lists = seedData.categories
const categories = []

db.once('open', () => {
  console.log('mongodb connected!')
  lists.forEach(list => {
    categories.push(list)
  })
  Category.create(categories)
    .then(() => {
      db.close()
      console.log('category done!')
    })
})