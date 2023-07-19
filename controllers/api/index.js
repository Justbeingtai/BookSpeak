const router = require('express').Router();
const chatsRoutes = require('./chatsRoutes');
const userRoutes = require('./userRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const googleBooksRoutes = require('./googleBooksRoutes');

router.use('/user', userRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/googleBooks', googleBooksRoutes);
router.use('/chat', chatsRoutes);

module.exports = router;