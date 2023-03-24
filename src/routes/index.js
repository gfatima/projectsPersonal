const express = require('express')
const router = express.Router()

router.get('/', require('./products'))
router.use('/products', require('./products'))


module.exports = router
