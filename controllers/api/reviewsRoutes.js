const express = require('express');
const router = express.Router();
const { Review } = require('../../models/Reviews');

// Create a new review
router.post('/reviews', async (req, res) => {
  try {
    const { userId, bookName, rating, comment } = req.body;

    // Create the review
    const review = await Review.create({
      userId,
      bookName,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Update the review
    review.rating = rating;
    review.comment = comment;
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Delete the review
    await review.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;




