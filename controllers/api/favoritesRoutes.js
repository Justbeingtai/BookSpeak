const router = require('express').Router();
const { Favorite } = require('../../models/Favorites');

// Add a book to favorites
router.post('/', async (req, res) => {
  try {
    const favoriteData = await Favorite.create(req.body);
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Remove a book from favorites
router.delete('/:id', async (req, res) => {
  try {
    const favoriteData = await Favorite.destroy({ where: { id: req.params.id } });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a user's list of favorite books
router.get('/:userId', async (req, res) => {
  try {
    const favoriteData = await Favorite.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;