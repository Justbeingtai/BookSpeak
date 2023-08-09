const router = require('express').Router();
const { User, Review } = require('../models');
const withAuth = require('../utils/auth');

// Landing page
router.get('/', async (req, res) => {
  res.render('index', { title: 'Main Page' });
});

// About page
router.get('/about', async (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Account page
router.get('/account', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include: [{ model: Review }],
    });
    const user = userData.get ({ 
      plain : true
    });
 
  res.render('account', { 
    ...user,
    logged_in: true
   });
 } catch (err) {
  res.status(500).json(err);
 }
});
// Chat page if the user is logged in. If not logged in, then will be redirected to log in 
router.get('/chat', withAuth,  async (req, res) => {
  res.render('chat', { title: 'Live Chat' });
});

// Log in page. If the user is already logged in, redirect to account
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/account');
    return;
  }
  res.render('login', { title: 'Login' });
});

// Reviews page
router.get('/reviews', async (req, res) => {
  try {
    // Get all reviews and JOIN with user data
    const reviewData = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const reviews = reviewData.map((review) => review.get({ plain: true }));

    res.render('reviews', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
