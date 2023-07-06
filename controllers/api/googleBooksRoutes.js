const express = require('express');
const router = express.Router();
require('dotenv').config();
const apiKey = process.env.API_KEY;
const fetch = require('node-fetch');

// Route for searching books
router.get('/search', async (req, res) => {
  try {
    const userSearch = req.query.userSearch;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&key=${apiKey}`);
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for retrieving book details
router.get('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`);
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for displaying search results
router.get('/results', async (req, res) => {
  try {
    const userSearch = req.query.userSearch;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&key=${apiKey}`);
    const result = await response.json();
    res.render('results', { books: result.items });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
