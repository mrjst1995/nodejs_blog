var express = require('express');
var router = express.Router();
var ctrlPost=require('../controllers/post_controllers');
var ctrlGet=require('../controllers/get_controllers');
const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');


router.get('/', ctrlGet.home);
router.get('/new_article',ensureAuthenticated, ctrlGet.article);
router.get('/sign_out', ctrlGet.sign_out);
router.get('/user',ensureAuthenticated, ctrlGet.user);
router.post('/register', ctrlPost.register);
router.post('/sign_in', ctrlPost.sign_in);
router.post('/new_article', ensureAuthenticated,ctrlPost.new_article);
router.get('/all_articles',ensureAuthenticated, ctrlGet.all_articles);
router.get('/actions/:id', ensureAuthenticated, ctrlGet.single_article);
router.get('/delete/:id', ensureAuthenticated, ctrlGet.del);
router.get('/edit/:id', ensureAuthenticated, ctrlGet.edit);
router.post('/edit/:id', ensureAuthenticated,ctrlPost.edit);
module.exports = router;

// router.get('/actions/:id', ensureAuthenticated,ctrlGet.one_article);
// router.delete('/:id',ensureAuthenticated, ctrlPost.del);