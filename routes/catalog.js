const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/posts')

const routeController = require('../controllers/routecontroller')

router.get('/', (req, res, next) => {
  Post.find().populate('user').exec(function(err, result) {
    if (err) {
      return next(err)
    }
    res.render('layout', { title: 'Messages', result:result })
  })
})

router.get('/sign-up', routeController.signup)
router.get('/login', routeController.login)
router.get('/logout', routeController.logout)
router.get('/create-post', routeController.create_post)
router.get('/admin', routeController.admin)

router.post('/', routeController.delete)
router.post('/sign-up', routeController.signup_post)
router.post('/login', routeController.login_post)
router.post('/create-post', routeController.create_post_post)
router.post('/admin', routeController.admin_post)

module.exports = router