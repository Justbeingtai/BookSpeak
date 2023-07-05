//const socket = io();
const apiKey = 'AIzaSyAGje7R9dYPvGOyeL-UGfogxVIYAeGdiCQ'

const searchForBook = () => {
  const userSearch = document.querySelector('#test').value;
  console.log('userSearch', userSearch)

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&key=${apiKey}`)
    .then(response => response.json())
    .then(result => {
  console.log(result)
  })

}

document.querySelector('#search-btn').addEventListener('click', searchForBook);

google.books.load();

function initialize() {
  var searchInput = 'Harry Potter'; 

  var search = new google.books.Search();
  search.execute(searchInput, function (books) {
    for (var i = 0; i < books.length; i++) {
      var book = books[i];
      console.log(book.title);
    }
  });
}


google.books.setOnLoadCallback(initialize);

