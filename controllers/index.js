const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const reviewsRoutes = require('./api/reviewsRoutes');
const googleBooksRoutes = require('./api/googleBooksRoutes');
const homeRoutes = require('./homeRoutes');
const chatsRoutes = require('./api/chatsRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/googleBooks', googleBooksRoutes);
router.use('/chat', chatsRoutes);
router.use('/', homeRoutes);

module.exports = router;

