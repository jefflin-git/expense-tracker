const db = require('../../config/mongoose')
const Record = require('../record')
const seedData = require('../../seedData')
const lists = seedData.records

db.once('open', () => {
  console.log('mongodb connected!')
  lists.forEach(list => {
    Record.create(list)
  })
  console.log('record done!')
})