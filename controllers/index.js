const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const reviewsRoutes = require('./api/reviewsRoutes');
const googleBooksRoutes = require('./api/googleBooksRoutes');
const favoritesRoutes = require('./api/favoritesRoutes');
const chatsRoutes = require('./api/chatsRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/googleBooks', googleBooksRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/chat', chatsRoutes);

module.exports = router;

