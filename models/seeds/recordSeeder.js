const db = require('../../config/mongoose')
const Record = require('../record')

const lists = [
  {
    name: '盥洗用具',
    category: '家居物業',
    date: '2020-12-28',
    amount: 100,
    icon: '<i class="fas fa-home"></i>'
  },
  {
    name: '油錢',
    category: '交通出行',
    date: '2020-12-28',
    amount: 30,
    icon: '<i class="fas fa-shuttle-van"></i>'
  },
  {
    name: '運動中心門票',
    category: '休閒娛樂',
    date: '2020-12-28',
    amount: 50,
    icon: '<i class="fas fa-grin-beam"></i>'
  },
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2020-12-28',
    amount: 60,
    icon: '<i class="fas fa-utensils"></i>'
  },
  {
    name: '停車費',
    category: '其他',
    date: '2020-12-28',
    amount: 40,
    icon: '<i class="fas fa-hand-holding-usd"></i>'
  }

]

db.once('open', () => {
  console.log('mongodb connected!')
  lists.forEach(list => {
    Record.create(list)
  })
  console.log('record done!')
})