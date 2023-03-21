const express = require('express')
const router = express.Router()


router.route('/user').get((req, res)=>{res.send('this is user route')})
// router.route('/:id').get().patch().delete()

module.exports = router