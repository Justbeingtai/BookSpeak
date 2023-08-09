const router = require('express').Router();
const { Review, User } = require('../../models/index');

// Create a new review
router.post('/reviews', async (req, res) => {
  console.log('Create new review from reviews route');
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // const { bookName, rating, comment, user_id} = req.body;

    // // Create the review and associate it with the user
    // const review = await Review.create({
    //   bookName,
    //   rating,
    //   comment,
    //   user_id
    // });

    res.status(200).json(newReview);
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

    // Get all reviews by a user
router.get('/reviews/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.findAll({
      where: {
        user_id: userId,
      },
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

    // Delete the review
    await review.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
