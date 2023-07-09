document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
  
    // Submit review form event
    reviewForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // Retrieve form input values
      const bookNameInput = document.getElementById('bookName');
      const ratingInput = document.getElementById('rating');
      const commentInput = document.getElementById('comment');
      
      const bookName = bookNameInput.value.trim();
      const rating = ratingInput.value;
      const comment = commentInput.value.trim();
  
      // Perform form validation
      if (bookName === '' || rating === '' || comment === '') {
        alert('Please fill in all the fields.');
        return;
      }
  
      // Perform submit review logic
      submitReview(bookName, rating, comment);
    });
  
    // Function to submit the review
    function submitReview(bookName, rating, comment) {
      // Perform AJAX request to submit the review
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/reviews', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      // Define the review data
      const reviewData = {
        bookName: bookName,
        rating: rating,
        comment: comment,
      };
  
      xhr.onload = function () {
        if (xhr.status === 201) {
          // Review submitted successfully
          alert('Review submitted!');
          // Clear form input values
          bookNameInput.value = '';
          ratingInput.value = '';
          commentInput.value = '';
        } else {
          // Error occurred while submitting the review
          alert('Failed to submit the review.');
        }
      };
  
      // Convert review data to JSON and send the request
      xhr.send(JSON.stringify(reviewData));
    }
  });