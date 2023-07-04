const searchForBook = () => {
  const userSearch = document.querySelector('#test').value;
  console.log('userSearch', userSearch);

  fetch(`/api/search?query=${userSearch}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
    });
};

document.querySelector('#search-btn').addEventListener('click', searchForBook);


// const apiKey = 'AIzaSyAGje7R9dYPvGOyeL-UGfogxVIYAeGdiCQ'

// const searchForBook = () => {
//   const userSearch = document.querySelector('#test').value;
//   console.log('userSearch', userSearch)

//   fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&key=${apiKey}`)
//     .then(response => response.json())
//     .then(result => {
//   console.log(result)
//   })

// }

// document.querySelector('#search-btn').addEventListener('click', searchForBook);

