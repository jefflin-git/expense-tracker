const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.send('login')
})

router.post('/login', (req, res) => {

})
router.get('/register', (req, res) => {
  res.send('register')
})

router.post('/register', (req, res) => {

})

module.exports = router