// Fetch a searched book from the Google Books API
const searchBooks = async (searchTerm) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching book data:', error);
      return [];
    }
  };
  
  // Function to render the book data in the template
  const renderBooks = (books) => {
    const template = Handlebars.compile(document.getElementById('google-template').innerHTML);
    const html = template({ books });
    document.getElementById('book-results-container').innerHTML = html;
  };
  
  // Function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm !== '') {
      const books = await searchBooks(searchTerm);
      renderBooks(books);
    }
  };
  
  // Event listener for the form submission
  document.getElementById('search-form').addEventListener('submit', handleFormSubmit);