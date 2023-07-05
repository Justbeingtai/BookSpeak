const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const reviewsRoutes = require('./api/reviewsRoute');
const googleBooksRoutes = require('./api/googleBooksRoute');
const favoritesRoutes = require('./api/favoritesRoute');
const chatsRoutes = require('./api/chatsRouter');

router.use('/users', userRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/googleBooks', googleBooksRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/chat', chatsRoutes);

module.exports = router;

