const db = require('../../config/mongoose')
const Category = require('../category')
const seedData = require('../../seedData')
const lists = seedData.categories

db.once('open', () => {
  console.log('mongodb connected!')
  lists.forEach(list => {
    Category.create(list)
  })
  console.log('category done!')
  // process.exit()
})