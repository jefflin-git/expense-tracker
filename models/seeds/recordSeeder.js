if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const seedData = require('../../seedData')
const bcrypt = require('bcryptjs')
const lists = seedData.records
const users = seedData.seedUsers

db.once('open', () => {
  console.log('mongodb connected!')
  users.forEach((user, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({ name: user.name, email: user.email, password: hash }))
      .then(async (user) => {
        switch (index) {
          case 0:
            const record1 = []
            for (let i = 0; i <= 2; i++) {
              lists[i].userId = user._id
              record1.push(lists[i])
            }
            await Record.insertMany(record1)
            break

          case 1:
            const record2 = []
            for (let i = 3; i <= 4; i++) {
              lists[i].userId = user._id
              record2.push(lists[i])
            }
            await Record.insertMany(record2)
            break
        }
      })
      .then(() => {
        console.log('all done!')
        process.exit()
      })
  })
})
