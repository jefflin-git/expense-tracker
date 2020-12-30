const db = require('../../config/mongoose')
const Record = require('../record')
const seedData = require('../../seedData')
const lists = seedData.records
const records = []

db.once('open', () => {
  console.log('mongodb connected!')
  lists.forEach(list => {
    records.push(list)
  })
  Record.create(records)
    .then(() => {
      db.close()
      console.log("record done!")
    })
})