const db = require('../../config/mongoose')
const Category = require('../category')

const lists = [
  {
    title: "家居物業",
    icon: '<i class="fas fa-home"></i>'
  },
  {
    title: "交通出行",
    icon: '<i class="fas fa-shuttle-van"></i>'
  },
  {
    title: "休閒娛樂",
    icon: '<i class="fas fa-grin-beam"></i>'
  },
  {
    title: "餐飲食品",
    icon: '<i class="fas fa-utensils"></i>'
  },
  {
    title: "其他",
    icon: '<i class="fas fa-hand-holding-usd"></i>'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  lists.forEach(list => {
    Category.create(list)
  })
  console.log('category done!')
})