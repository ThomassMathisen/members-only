let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Post = require('../models/posts');

let routeController = require('../controllers/routeController');

// Get Home Page
router.get('/', (req, res, next) => {
  Post.find().populate('user').exec(function(err,result) {
    if (err) {
      return next(err);
    }
    res.render('layout',{title:'Messages',result:result});
    })   
});

router.get('/sign-up',routeController.sign_up_get);
router.get('/login',routeController.login_get);
router.get('/logout',routeController.logout);
router.get('/create_post',routeController.create_post);
router.get('/admin',routeController.admin);

router.post('/admin',routeController.admin_post);

router.post('/sign-up',routeController.sign_up_post);
router.post('/login',routeController.login_post);
router.post('/create_post',routeController.create_post_post);
router.post('/',routeController.delete);

module.exports = router;