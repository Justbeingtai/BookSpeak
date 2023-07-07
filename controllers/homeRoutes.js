const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('index', { title: 'Main Page' });
  });
  
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
  });
  
  router.get('/account', (req, res) => {
    res.render('account', { title: 'Account' });
  });
  
  router.get('/chat', (req, res) => {
    res.render('chat', { title: 'Live Chat' });
  });
  
  router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
  });
  
  router.get('/reviews', (req, res) => {
    res.render('reviews', { title: 'Review Page' });
  });

  module.exports = router;